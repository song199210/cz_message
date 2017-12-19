const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
module.exports={
    entry:__dirname+"/src/main.js",
    output:{//设置出口目录的名称和路径
        filename:"[name].js",
        path:path.resolve(__dirname,"dist")
    },
    devtool:"eval-source-map",
    devServer:{//配置webpack-dev-server服务器
        host:"localhost",
        port:"8083",
        inline:true,
        historyApiFallback:true,
        hot:true,
        quiet:true,
        https:false
    },
    resolve:{//各位配置
        extensions:['.js','.vue','.css','.jpg','.png'],
        alias: {//重点，别名设置；没有它vue就没用了
          'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module:{
        rules:[{//配置vue-loader加载器,用来处理vue单文件的
                test:/\.vue$/,
                use:[{
                    loader:"vue-loader"
                }]
            },{//用来支持ES6语法，并将ES6转成ES5
                test:/\.js$/,
                exclude:/node_modules/,
                use:[{
                    loader:"babel-loader",
                    options:{
                        presets:['es2015','stage-0']
                    }
                }]
            },{//配置CSS-loader和style-loader，用来处理css
                test:/.css$/,
                exclude:/node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:"css-loader"
                        }
                    ]
                })
            },{
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            },{
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            },{
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:__dirname+"/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"production"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'build',
            filename: '[name].min.js',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}