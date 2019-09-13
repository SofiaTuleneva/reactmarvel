const path = require("path");
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "dist/");

module.exports = {
	entry: ["./src/index.js"],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['env'] }
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "sass-loader",
					options: {
						includePaths: ["absolute/path/a", "absolute/path/b"]
					}
				}]
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		publicPath: bundlePath,
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname,'public'),
		port: 8000,
		publicPath: "http://localhost:8000/dist"
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery/dist/jquery.min.js",
			jQuery: "jquery/dist/jquery.min.js",
			"window.jQuery": "jquery/dist/jquery.min.js"
		})
	]
};