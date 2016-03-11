const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const AppCachePlugin = require("appcache-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MODE = process.env.MODE_ENV;

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

const PATHS_EXCLUDE = [
    PATHS.styles,
    PATHS.test,
    PATHS.modules,
    PATHS.public
];

var common = {
	entry: [
        PATHS.src
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", ".json", ".scss", ".sass", ".css"],
        modulesDirectories: [
            "node_modules",
            PATHS.modules
        ]
    },
    module: {
        loaders: [
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
        	},
        	{
            	test: /\.json$/,
            	loader: "json-loader",
            	include: PATHS.src
            },
        	{
            	test: /\.(scss|sass)$/,
            	loader: MODE === "production" ? ExtractTextPlugin.extract("sass-loader") : "sass-loader",
            	include: PATHS.styles
        	},
        	{
        		test: /\.css$/,
        		loader: MODE === "production" ? ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1!postcss-loader") : "style-loader!css-loader?modules&importLoaders=1!postcss-loader",
        		include: PATHS.styles
        	},
        	{
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192&name=/images/[hash].[ext]"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=/fonts/[hash].[ext]"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=/fonts/[hash].[ext]"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml&name=/fonts/[hash].[ext]"
            }
    	]
    },
    postcss: function() {
        return [autoprefixer, precss]
    }
}

if ( MODE === "development" ) {
	module.exports = merge(common, {
		output: {
	        path: PATHS.public,
	        filename: "schedule.js"
	    },
		module: {
	        preLoaders: [{
	            test: /\.(js|jsx)?$/,
	            loaders: ["eslint", "jscs"],
	            include: PATHS.src
        	}]
		},
		devtool: "eval",
		devServer: {
	        contentBase: PATHS.public,
	        stats: "errors-only",
	        progress: true,
	        colors: true,
	        port: 3000,
	        hot: true,
	        inline: true
	    },
	    plugins: [
	        new webpack.HotModuleReplacementPlugin(),
	        new HtmlWebpackPlugin({
		      	title: "Toth schedule module",
			    inject: false,
		    	template: PATHS.template,
			    appMountId: "schedule",
		    }),
	        new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery"
	        }),
            new NpmInstallPlugin({
                save: true
            })
	    ]
	});
} else if ( MODE === "production" ) {
	module.exports = merge(common, {
		output: {
	        path: PATHS.assets,
	        publicPath: "/assets",
	        filename: "js/schedule.js"
	    },
		devtool: "source-map",
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
            	compress: {
                	warnings: false
            	}
        	}),
        	new webpack.ProvidePlugin({
            	$: "jquery",
            	jQuery: "jquery"
        	}),
        	new HtmlWebpackPlugin({
            	title: "Toth schedule module",
            	template: PATHS.template,
            	appMountId: "schedule",
            	inject: false
        	}),
        	new ExtractTextPlugin( "css/[hash].css", { allChunks: true } ),
        	new webpack.optimize.CommonsChunkPlugin({
            	name: "schedule",
                minChunks: Infinity,
            }),
            new webpack.NoErrorsPlugin(),
            /*new ManifestPlugin(),
            new ChunkManifestPlugin({
                filename: "chunk-manifest.json",
                manifestVariable: "webpackManifest"
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new AppCachePlugin({
                settings: ['prefer-online'],
                output: 'my-manifest.appcache'
            })*/
    	]
	});
}
