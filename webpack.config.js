const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const AppCachePlugin = require("appcache-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const csswring = require("csswring");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PRODUCTION = process.env.MODE_ENV === "production" ? true : false;

const PATHS = {
	src: path.join(__dirname, "src"),
    styles: path.join(__dirname, "styles"),
    images: path.join(__dirname, "images"),
    test: path.join(__dirname, "test"),
    template: "node_modules/html-webpack-template/index.ejs",
    modules: path.join(__dirname, "node_modules"),
    public: path.join(__dirname, "public"),
    assets: path.join(__dirname, "public", "assets")
};

const PATHS_EXCLUDE = [PATHS.styles, PATHS.test, PATHS.modules, PATHS.public];

const entry = [PATHS.src];

const output = {};

const resolve = {
    extensions: ["", ".js", ".jsx", ".json", ".scss", ".sass", ".css"],
    modulesDirectories: [
        "node_modules",
        PATHS.modules
    ]
};

const modules = {};
const loaders = [
    {
        test: /\.(js|jsx)?$/,
        loader: "babel",
        query: {
            cacheDirectory: true,
            plugins: ["transform-decorators-legacy"],
            presets: ["react", "es2015", "stage-0"]
        },
        include: PATHS.src,
        exclude: PATHS_EXCLUDE
    }, {
        test: /\.json$/,
        loader: "json-loader",
        include: PATHS.src
    }, {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192&name=/images/[hash].[ext]"
    }, {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192&name=/images/[hash].[ext]"
    }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]"
    }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]"
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=/fonts/[hash].[ext]"
    }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=/fonts/[hash].[ext]"
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=/fonts/[hash].[ext]"
    }
];

const postcss = function() {
    return [autoprefixer, precss, csswring]
};

const devtool = PRODUCTION ? "source-map" : "eval";

const plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
        title: "Toth schedule module",
        template: PATHS.template,
        appMountId: "schedule",
        inject: false
    })
];

const preLoaders = [{
    test: /\.(js|jsx)?$/,
    loaders: ["eslint", "jscs"],
    include: PATHS.src
}];


if ( PRODUCTION ) {
    output.path = PATHS.assets;
    output.publicPath = "/assets";
    output.filename = "js/schedule.js";
    loaders.push({
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract("sass-loader"),
        include: PATHS.styles
    });
    loaders.push({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1!postcss-loader"),
        include: PATHS.styles
    });
    modules.loaders = loaders;
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push( new ExtractTextPlugin( "css/[hash].css", { allChunks: true } ) );
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "schedule",
        minChunks: Infinity
    }));
    plugins.push( new webpack.NoErrorsPlugin() );
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
    output.path = PATHS.public;
    output.filename = "schedule.js";
    loaders.push({
        test: /\.(scss|sass)$/,
        loader: "sass-loader",
        include: PATHS.styles
    });
    loaders.push({
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&importLoaders=1!postcss-loader",
        include: PATHS.styles
    });
    modules.loaders = loaders;
    modules.preLoaders = preLoaders;
    plugins.push( new webpack.HotModuleReplacementPlugin() );
    plugins.push(new NpmInstallPlugin({
        save: true
    }));
}

const devServer = {
    contentBase: PATHS.public,
    stats: "errors-only",
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
    devServer: PRODUCTION ? undefined : devServer,
    plugins: plugins
};
