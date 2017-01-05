var tpl=require('./template');

module.exports=tpl({
    PLUGIN_NAME:'<%=plugName%>',
    argsTrue:function (arguments) {
      return arguments.length==0&&"必须提供参数";
    },
    doPlagin:function  (gutil,file,enc,content) {
    	gutil.fs.write('test.js','aaa');
    	gutil.fs.commit(function  () {
    		
    	});
      return content+"this is my plagin 1";
    }
});

