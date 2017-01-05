
var gulp = require('gulp');
var gutil=require('gulp-util');
var path=require('path');



gulp.task('demo',function  () {
	gulp.src('test/**/*.txt',{
		buffer:true,//使用buffer的方式进行读写
		read:true,//如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件
		base:'test'//会加上原路径中基础部分除去本字符串
	}).pipe(gutil.buffer(function(err, files) {
		var file=files[0];

		if(file.isStream()){
			throw new gutil.PluginError('测试插件',"我不能处理Stream类型的内容");
		}else if(file.isBuffer()){
			gutil.log(gutil.colors.red("我可以处理buffer类型的内容"));
		}else if(file.isNull()){
			gutil.log(gutil.colors.yellow("内容不能为空"));
		}else if(file.isDirectory()){
			gutil.log(gutil.colors.yellow("这是一个目录"));
		}

		var content=file.contents.toString();
		var path=gutil.colors.blue(file.path);

		path=gutil.replaceExtension(path,'.js');

		content=gutil.colors.magenta(content);
		// content=gutil.template(content,{time:(new Date()).toString()});
		content=gutil.template(content, {
		  time: (new Date()).toString(),
		  file: 'temp.js'
		});
  		gutil.log("\n模板文件的路径为:",path,content);

  		files.push(new gutil.File({
  			cwd: '/',
			base: '/test/',
			path: '/test/file.js',
			contents: new Buffer('var x = 123')
  		}));

  		
  	})).pipe(gutil.buffer(function  (err,files) {
  		var file=files[0][1];
  		var content=file.contents.toString();
  		gutil.log("文件内容",content);

  		var newFile=file.clone();
  		newFile.dirname="/temp/";
  		gutil.log("相对于base的路径:",newFile.relative);
  		gutil.log("基本路径:",newFile.base);
  		gutil.log("完整路径:",newFile.path);
  		gutil.log("相对于base的路径:",newFile.history);
  		gutil.log("目录名称:",newFile.dirname);
  		gutil.log("基本文件名:",newFile.basename);
  		gutil.log("后缀:",newFile.extname);
  	}));
});