/* eslint-disable no-unused-vars */
'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  initializing: function () {
  // this.pkg = require('package.json');

    this.log(yosay(
      '=====PATH: ' + this.destinationRoot() + ' ====!'
    ));
  },

  /* prompting() {
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
   } */

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cool ' + chalk.red('generator-neo-api') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  welcome: function () {
    this.log(yosay(
      'Welcome to the HotTowel AngularJS generator!'
    ));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );

    this.fs.copy(
      this.templatePath('eslint.json'),
      this.destinationPath('eslint.json')
    );

    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    // this.fs.copy(
    //   this.templatePath('api'),
    //   this.destinationPath('.api')
    // );

    this.fs.copyTpl(
      this.templatePath('v1-spec.raml'),
      this.destinationPath('v1-spec.raml'),
      { title: 'Templating with Yeoman' }
    );
  },

  displayName: function () {
    this.log('Creating ' + this.appName + ' app based on HotTowel.');
  },

  packageFiles: function () {

  },

  install: function () {
    this.installDependencies();
  }
});
