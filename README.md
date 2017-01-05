# generator-mgulp
> 关于gulp的一些生成策略
#### 依赖项目
yeoman+nodejs+cnpm
请确保你安装了以上项目
并且确保你安装了淘宝镜像cnpm

#### 使用方法
clone项目后,`npm link`到全局

#### 生成一个gulp空项目
> 新建一个文件夹运行
```
yo mgulp
```
> 会创建一个基础的gulp项目,然后后台运行npm init 在与你交互的时候生成package.json。并且会自动安装gulp

#### 生成自定义插件
```
yo mgulp:selfplug yourPlugName
```
或者
```
yo mgulp:sp yourPlugName
```

>上面两种方式是等价的
上面的命令会在你的项目中的script文件夹中生成一个template文件和你的插件文件
在插件文件中会引入template文件
请妥善使用`argsTrue`和`doPlagin`两个方法
###### argsTrue方法
传递你的插件接收的参数,你可以接收这些参数进行你自己的逻辑处理
如果你返回任何字符串,你的插件将被异常中止,并且抛出你返回的字符串的内容的异常
如果你返回空或者false或者不返回值,或者返回的不是字符串,那么将不会抛出异常
###### doPlagin方法
用于你去处理插件的逻辑
> 参数说明
- file-文件信息对象:https://github.com/gulpjs/vinyl
- gutil-gulp工具类
- enc-编码
- content-文件内容
> 返回值
你的返回值将被下一个插件进行处理,请确保你要返回你处理过的内容.
如果你对内容不做任何处理,那么请原样返回你的内容
```
var tpl=require('./template');

module.exports=tpl({
    PLUGIN_NAME:'t1',//插件名称,根据gulp规范要求异常中带插件名称
    argsTrue:function (arguments) {//返回参数是否合法的判断
      return arguments.length==0&&"必须提供参数";
    },
    doPlagin:function  (gutil,file,enc,content) {
      return content+"this is my plagin 1";
    }
});
```
