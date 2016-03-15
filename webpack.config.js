const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const AppCachePlugin = require("appcache-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const autoprefixer = require("autoprefixer");
/*const precss = require("precss");*/
/*const csswring = require("csswring");*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MODE_ENV = process.env.MODE_ENV;
const __DEPLOYMENT__ = MODE_ENV === "deploy" ? true : false;
const __PRODUCTION__ = MODE_ENV === "prod" ? true : false;
const __DEVELOPMENT__ = MODE_ENV === "dev" ? true : false;

const PATHS = {
	source: path.join(__dirname, "web", "static", "js"),
    production: path.join(__dirname, "priv", "static"),
    development: path.join(__dirname, "development"),
    styles: path.join(__dirname, "web", "static", "css"),
    assets: path.join(__dirname, "web", "static", "assets", "*"),
    test: path.join(__dirname, "test"),
    template: "node_modules/html-webpack-template/index.ejs",
    modules: path.join(__dirname, "node_modules")    
};

const PATHS_EXCLUDE = [PATHS.test, PATHS.modules, PATHS.development, PATHS.styles];

const entry = [PATHS.source, PATHS.styles +"/main.scss"];

const output = {};

const resolve = {
    extensions: ["", ".js", ".jsx", ".json", ".scss", ".sass", ".css"],
    modulesDirectories: ["node_modules"],
    alias: {
      phoenix_html:
        __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix:
        __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
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
        include: PATHS.source,
        exclude: PATHS_EXCLUDE
    }, {
        test: /\.json$/,
        loader: "json-loader",
        include: PATHS.source
    }, {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192&name=/assets/images/[name].[ext]"
    }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=/assets/fonts/[name].[ext]"
    }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=/assets/fonts/[name].[ext]"
    }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=/assets/fonts/[name].[ext]"
    }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=/assets/fonts/[name].[ext]"
    }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=/assets/fonts/[name].[ext]"
    }
];

const postcss = function() {
    return [autoprefixer, precss, csswring]
};

const devtool = __DEVELOPMENT__ ? "eval" : "source-map";

const plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new webpack.DefinePlugin({    	
	    "process.env": { 
	    	NODE_ENV: JSON.stringify( "production" ),
	    	__DEPLOYMENT__: __DEPLOYMENT__,
	    	__PRODUCTION__: __PRODUCTION__,
		    __DEVELOPMENT__: __DEVELOPMENT__
	    }
	})
];

const preLoaders = [{
    test: /\.(js|jsx)?$/,
    loaders: ["eslint", "jscs"],
    include: PATHS.source
}];

if ( !__DEVELOPMENT__ ) {
    output.path = PATHS.production;
    output.filename = "js/schedule.js";
    loaders.push({
        test: /\.(scss|sass|css)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader"),
        include: PATHS.styles
    });    
    modules.loaders = loaders;
    plugins.push( new webpack.NoErrorsPlugin() );
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push( new ExtractTextPlugin( "css/schedule.css" ) );
	/*loaders.push({
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1!postcss-loader"),
        include: PATHS.styles
    });
    plugins.push( new CopyWebpackPlugin([{ from: PATHS.assets }]) );    
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "schedule",
        minChunks: Infinity
    }));
    plugins.push( new ManifestPlugin() );
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
    output.filename = "schedule.js";
    loaders.push({
        test: /\.(scss|sass|css)$/,
        loader: "style-loader!css-loader!sass-loader",
        include: PATHS.styles
    });
    modules.loaders = loaders;
    modules.preLoaders = preLoaders;
    plugins.push( new webpack.HotModuleReplacementPlugin() );
    plugins.push(new NpmInstallPlugin({
        save: true
    }));
    plugins.push(new HtmlWebpackPlugin({
        title: "Toth schedule module",
        template: PATHS.template,
        appMountId: "schedule",
        inject: false,
        mobile: true
    }));
}

const devServer = {
    contentBase: PATHS.development,
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
    devServer: __DEVELOPMENT__ ? devServer : undefined,
    plugins: plugins
};
