const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: "source-map",
    entry: './src/index.js',
    devServer: {
        contentBase: './dist',
        open:true,
        hot:true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        //url-loader功能类似
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
            test: /\.js$/,
            exclude: /nide_modules/,
            use:[{
                    loader: "babel-loader",
                    options: {
                        presets:["@babel/preset-env"],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    },
                }],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'game.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, 'dist'),
    }
}