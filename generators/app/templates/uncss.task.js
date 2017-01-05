var gulp = require('gulp');
var uncss = require('gulp-uncss');
/*
去除html中没有引用的css样式,为css瘦身.
有了这个插件,在也不用担心bootstrap的臃肿了
这个插件是由gulp官方维护
*/
module.exports=function () {
	return gulp.src('site.css')//需要瘦身的css
	.pipe(uncss({//需要检查的html,可以是本地文件也可以是线上的文件(线上文件影响速度)
		html: ['index.html', 'posts/**/*.html', 'http://example.com']
		,ignore: ['.hover',/^.*click$/]//这些选择器不要去除
	}))
	.pipe(gulp.dest('./out'));//瘦身后的存储位置
}