var tpl=require('./template');

module.exports=tpl({
  PLUGIN_NAME:'t2',
  argsTrue:function (arguments) {
    return arguments.length>=1;
  },
  doPlagin:function  (gutil,file,enc,content) {
    gutil.log(content);
    return content;
  }
});

