const path = require('path')
/* 
    09/27/2022
    There seems to be a known bug when using latest @compiled/webpack-loader
    Error: "You forgot to add the 'CompiledExtractPlugin'" when it is in fact 
    defined as a plugin.
    https://github.com/atlassian-labs/compiled/issues/1137
*/
const { CompiledExtractPlugin } = require('@compiled/webpack-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelOpts = require('./babel.config')

const getNodeEnv = () => {
    if (process.env.NODE_ENV === 'production') return 'production'
    return 'development'
}

module.exports = {
    mode: getNodeEnv(),
    entry: './index.js',
    context: path.resolve(__dirname, 'src/'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/')
    },
    devtool: getNodeEnv() === 'production' ? 'source-map' : 'eval-source-map',
    resolve: {
        symlinks: false,
        alias: {
            react: 'preact/compat',
            'react-dom': 'preact/compat'
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                loader: 'babel-loader',
                options: babelOpts
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.svg/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOpts
                    },
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: false
                        }
                    }
                ]
            },
            {
                test: /\.(jsx?)$/,
                loader: '@compiled/webpack-loader',
                // options: {
                //     extract: true
                // }
            }
        ]
    },
    plugins: [
        new CompiledExtractPlugin()
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
        magicHtml: true,
        static: [
            {
                directory: path.resolve(__dirname, 'preview/')
            }
        ]
    }
}
