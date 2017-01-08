/* eslint-disable no-unused-vars */
'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
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
