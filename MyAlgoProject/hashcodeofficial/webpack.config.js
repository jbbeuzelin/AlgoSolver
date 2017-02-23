var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'sol.ts'),
	output: {
		path: __dirname,
		filename: 'bundle.js',
		devtoolModuleFilenameTemplate: '[resourcePath]'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.ts']
	},
	target: 'node',
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }
		]
	}
};