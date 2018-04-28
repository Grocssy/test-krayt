const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

let DEV = NODE_ENV == "development";

module.exports = {
	context: __dirname + "/frontend",
	entry: {
		app: "./common/scripts/app.js",
		bootstrap: "bootstrap",
		jquery: "jquery"
	},
	output: {
		path: __dirname + '/public/assets/scripts/',
		filename: "[name].js"
	},
	
	//watch: DEV,
	
	//devtool: DEV ? "source-map" : false,
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			},
			/*{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: !DEV
							}
						}
					],
					fallback: "style-loader"
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: !DEV
							}
						},
						{
							loader: 'sass-loader',
							options: {
								outputStyle: 'compact'
							}
						}
					],
					fallback: "style-loader"
				})
			},
			{
				test: /\.jade$/,
				use: {
					loader: 'jade-loader2'
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				include: /(node_modules)/,
				use: {
					loader: 'file-loader',
					options: {
						name: "[path][name].[ext]",
						context: 'node_modules',
						outputPath: 'assets/images/'
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'file-loader',
					options: {
						name: "[path][name].[ext]",
						outputPath: 'assets/images/'
					}
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'file-loader',
					options: {
						name: "[name].[ext]"
					}
				}
			}*/
		]
	},
	plugins: [
		/*new webpack.NoEmitOnErrorsPlugin(),*/
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ["common", "jquery"]
		}),
		//new ExtractTextPlugin('template_styles.css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		
		// create empty html
		// new HtmlWebpackPlugin({
		// 	filename: 'index.html',
		// 	title: 'build'
		// })
	].concat(DEV ?
		[
			new NpmInstallPlugin({save: true}),
		] :
		[]
	)
}