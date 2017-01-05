'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor:function  () {
   yeoman.Base.apply(this,arguments);
    this.argument("names",{type:'String',description :'请输入插件名称',required:false});
    if(!this.names){
      throw "插件名称必须提供";
    }
  },

  writing: function () {     
      
    this.fs.copyTpl(this.templatePath('t1.js'),
      this.destinationPath("script/"+this.names+'.js'),
      {plugName:this.names});
    this.fs.copy(this.templatePath('template.js'),
      this.destinationPath("script/template.js"));
    var content=this.fs.read(this.destinationPath("gulpfile.js"));
    content="var "+this.names+" = require('./script/"+this.names+"');\n"+content;
    this.fs.write(this.destinationPath("gulpfile.js"),content);
  },

  install: function () {
    // this.installDependencies();
  }
});
