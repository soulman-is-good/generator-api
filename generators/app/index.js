/* eslint-disable no-unused-vars*/
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
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  displayName: function() {
    this.log('Creating ' + this.appName + ' app based on HotTowel.');
  },

  packageFiles: function() {
    var context = {
      appName: this.appName
    };

    this.copy('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_gulpfile.js', 'gulpfile.js');
    this.template('_gulp.config.js', 'gulp.config.js');
    this.template('_karma.conf.js', 'karma.conf.js');
    this.template('_README.md', 'README.md');
    // this.directory('src/client/test-helpers');
    // this.template('src/client/_index.html', 'src/client/index.html');
  },

  install: function () {
    this.installDependencies();
  }
});
