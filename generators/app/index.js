/* eslint-disable no-unused-vars */
'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  // initializing: function () {
  // this.pkg = require('package.json');
  //   this.log(yosay(
  //     '==INIT==='
  //   ));
  // },

/*

  prompting() {
     return this.prompt([{
         type    : 'input',
         name    : 'name',
         message : 'Your project name',
         default : this.appname // Default to current folder name
      }, {
         type    : 'confirm',
         name    : 'cool',
         message : 'Would you like to enable the Cool feature?'
      }]).then((answers) => {
         this.log('app name', answers.name);
         this.log('cool feature', answers.cool);
     });
   }

   // var done = this.async();
   // this.prompt({
   //   type: 'input',
   //   name: 'name',
   //   message: 'Your project name',
   //   //Defaults to the project's folder name if the input is skipped
   //   default: this.appname
   // }, function(answers) {
   //   this.props = answers
   //   this.log(answers.name);
   //   done();
   // }.bind(this));

*/

  prompting: function () {
    this.log(yosay(
      '==PATH: ' + this.destinationRoot() + ' ====!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'Light version?',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  welcome: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome ' + chalk.red('api') + ' generator!'
    ));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copyTpl(
      this.templatePath('_v1-spec.raml'),
      this.destinationPath('v1-spec.raml'),
      { title: 'Templating with Yeoman' }
    );

    // this.fs.copy(
    //   this.templatePath('api'),
    //   this.destinationPath('.api')
    // );
  },

  displayName: function () {
    this.log('Creating ' + this.appName + ' app based on HotTowel.');
  },

  packageFiles: function () {

  },

  install: function () {
    this.npmInstall(); // this.installDependencies({ bower: false });
  }
});
