'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({


  writing: function () {
    var conf= this.fs.readJSON(this.templatePath('cnf.js'));

    for (var key in conf.files) {
      
      this.fs.copy(
        this.templatePath(key),
        path.join(this.destinationRoot(),conf.files[key],key)
        );
  
    };
   
    
  },

  install: function () {

    this.spawnCommandSync('cnpm',['init']); 
    this.spawnCommandSync('cnpm',['install','gulp','mem-fs-editor','mem-fs','--save-dev']);
    this.spawnCommand('gulp',['demo']);
 

  }
});
