const webpack = require('webpack');
const path = require('path');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const csswring = require('csswring');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MODE_ENV = process.env.MODE_ENV;
const __DEPLOYMENT__ = MODE_ENV === 'deploy';
const __PRODUCTION__ = MODE_ENV === 'prod';
const __DEVELOPMENT__ = MODE_ENV === 'dev';
const __TESTING__ = MODE_ENV === 'testing';

const PATHS = {
    source: path.join(__dirname, 'web', 'static', 'js'),
    production: path.join(__dirname, 'priv', 'static'),
    development: path.join(__dirname, 'development'),
    styles: path.join(__dirname, 'web', 'static', 'css'),
    assets: path.join(__dirname, 'web', 'static', 'assets'),
    test: path.join(__dirname, 'test'),
    template: 'node_modules/html-webpack-template/index.ejs',
    modules: path.join(__dirname, 'node_modules'),
    phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js',
    phoenix_html: __dirname + '/deps/phoenix_html/web/static/js/phoenix_html.js'
};

const PATHS_EXCLUDE = [PATHS.test, PATHS.modules, PATHS.development, PATHS.styles, PATHS.assets];

const entry = [PATHS.source, PATHS.styles + '/app.scss'];

const output = {};

const resolve = {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.sass', '.css'],
    modulesDirectories: ['node_modules'],
    alias: {
        phoenix_html: PATHS.phoenix_html,
        phoenix: PATHS.phoenix
    }
};

const modules = {};
const loaders = [{
    test: /\.(js|jsx)?$/,
    loader: 'babel',
    query: {
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy', 'add-module-exports'],
        presets: ['react', 'es2015', 'stage-0']
    },
    include: [PATHS.source, PATHS.phoenix, PATHS.phoenix_html],
    exclude: PATHS_EXCLUDE
}, {
    test: /\.json$/,
    loader: 'json-loader',
    include: PATHS.source
}, {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192&name=/assets/images/[name].[ext]'
}, {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]'
}, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]'
}, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream&name=/fonts/[name].[ext]'
}, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file?name=/fonts/[name].[ext]'
}, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml&name=/fonts/[name].[ext]'
}];

const postcss = function() {
    return [autoprefixer, precss, csswring]
};

const devtool = (__DEVELOPMENT__ || __TESTING__) ? 'eval' : 'source-map';

const plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            __DEPLOYMENT__: __DEPLOYMENT__,
            __PRODUCTION__: __PRODUCTION__,
            __DEVELOPMENT__: __DEVELOPMENT__,
            __TESTING__: __TESTING__
        }
    })
];

const preLoaders = [{
    test: /\.(js|jsx)?$/,
    loaders: ['eslint', 'jscs'],
    include: PATHS.source
}];

if (__DEPLOYMENT__ || __PRODUCTION__) {
    output.path = PATHS.production;
    output.filename = 'js/schedule.js';
    loaders.push({
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
        include: PATHS.styles
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
    });
    modules.loaders = loaders;
    plugins.push(new webpack.NoErrorsPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push(new ExtractTextPlugin('css/schedule.css'));
    plugins.push(new CopyWebpackPlugin(
        [{
            from: PATHS.assets,
            to: 'assets'
        }], {
            ignore: [
                { glob: 'images/*', dot: true }
            ]
        }
    ));
    /*plugins.push( new ManifestPlugin() );
    plugins.push(new ChunkManifestPlugin({
        filename: "chunk-manifest.json",
        manifestVariable: "webpackManifest"
    }));
    plugins.push( new webpack.optimize.OccurenceOrderPlugin() );
    plugins.push(new AppCachePlugin({
        settings: ['prefer-online'],
        output: 'my-manifest.appcache'
    }));*/
} else {
    output.path = PATHS.development;
    output.filename = 'schedule.js';
    loaders.push({
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader',
        include: PATHS.styles
    }, {
        test: /\.css$/,
        loader: 'style!css'
    });
    modules.loaders = loaders;
    modules.preLoaders = __DEVELOPMENT__ ? preLoaders: [];
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new NpmInstallPlugin({
        save: true
    }));
    plugins.push(new HtmlWebpackPlugin({
        title: 'Toth Schedule Module',
        template: PATHS.template,
        appMountId: 'schedule',
        inject: false,
        mobile: true
    }));
    plugins.push(new CopyWebpackPlugin(
        [{ from: PATHS.assets }], {
            ignore: [
                { glob: 'images/*', dot: true }
            ]
        }
    ));
}

const devServer = {
    contentBase: PATHS.development,
    stats: 'errors-only',
    progress: true,
    colors: true,
    port: 3000,
    hot: true,
    inline: true
};

module.exports = {
    entry: entry,
    output: output,
    resolve: resolve,
    module: modules,
    postcss: postcss,
    devtool: devtool,
    devServer: (__DEVELOPMENT__ || __TESTING__) ? devServer : undefined,
    plugins: plugins
};
