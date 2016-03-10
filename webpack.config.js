const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const AppCachePlugin = require("appcache-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const MODE = process.env.MODE_ENV;

const PATHS = {
	src: path.join(__dirname, "src"),
    app: path.join(__dirname, "app"),
    dev: path.join(__dirname, "dev"),    
    styles: path.join(__dirname, "styles"),
    public: path.join(__dirname, "public")
};

const PATHS_EXCLUDE = [
	path.resolve( __dirname, "app" ),
    path.resolve( __dirname, "dev" ),
    path.resolve( __dirname, "images" ), 
    path.resolve( __dirname, "node_modules" ), 
    path.resolve( __dirname, "style" ),
    path.resolve( __dirname, "templates" ),
    path.resolve( __dirname, "test" )
];

var common = {
	entry: [
        PATHS.src
    ],
    resolve: {
        extensions: ["", ".jsx", ".scss", ".js", ".json", ".css"],
        modulesDirectories: [
            "node_modules",
            path.resolve(__dirname, "./node_modules")
        ]
    },
    module: {
        loaders: [
        	{
            	test: /\.(js|jsx)?$/,
            	loader: "babel",
            	include: PATHS.src,
            	query: {
                    cacheDirectory: true,
                    plugins: ["transform-decorators-legacy"],
        			presets: ["react", "es2015", "stage-0"]
      			},
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
        		loader: MODE === "production" ? ExtractTextPlugin.extract("style-loader", "css-loader") : "style-loader!css-loader",
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
    postcss: [autoprefixer],
}

if ( MODE === "development" ) {
	module.exports = merge(common, {
		output: {
	        path: path.resolve(__dirname, "public"),
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
	        contentBase: path.resolve(__dirname, "public"),
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
		    	template: "node_modules/html-webpack-template/index.ejs",			 
			    appMountId: "schedule",
		    }),
	        new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery"
	        })
	    ]
	});
} else if ( MODE === "production" ) {
	module.exports = merge(common, {
		output: {
	        path: path.resolve(__dirname, "public", "assets"),   
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
            	template: "node_modules/html-webpack-template/index.ejs",
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