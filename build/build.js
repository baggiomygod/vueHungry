// https://github.com/shelljs/shelljs
require('shelljs/global') // 依赖shelljs的库，提供API可以在nodejs里执行常用shell命令
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora') // 运行的异步任务的提示
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf') // 引入webpack.prod.conf.js

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

// 开始打包提示
var spinner = ora('building for production...') // 打包过程中的提示文案
spinner.start()

// static目录下文件拷贝到dist/static/css目录下
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

// 运行webpack ,传入webpackConfig
// 打包结束，停止spinner(ora)
// 输出打包完成的信息
webpack(webpackConfig, function (err, stats) {
  spinner.stop() 
  if (err) throw err
  process.stdout.write(stats.toString({ 
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
