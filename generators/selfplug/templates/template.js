/*
采用模板方法模式将固有的代码进行封装
采用buffer的方式处理文件内容
实际文本处理方式参照t1.js
*/

var through = require('through2');
var gutil = require('gulp-util');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var PluginError = gutil.PluginError;
// 常量
var store = memFs.create();
var fs = editor.create(store);
gutil.fs=fs;
function body (CONFIG) {
  // body...



// 插件级别的函数（处理文件）
this.doPlagin=function () {
  var errorMsg="";
  if ((errorMsg=CONFIG.argsTrue(arguments)) && typeof(errorMsg)==="string" && errorMsg.length>0) {
    throw new PluginError(CONFIG.PLUGIN_NAME, errorMsg);
  }


  // 创建一个 stream 通道，以让每个文件通过
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(CONFIG.PLUGIN_NAME, '不支持流的方式!'));
      return cb();
    }

    if (file.isBuffer()) {
      var content=file.contents.toString();
      content=CONFIG.doPlagin(gutil,file,enc,content);
    }
    file.contents=Buffer.from(content);
    // 确保文件进入下一个 gulp 插件
    this.push(file);
    cb();
  });

  // 返回文件 stream
  return stream;
};
}
// 导出插件主函数
module.exports = function  (argument) {
  return new body(argument).doPlagin;
};