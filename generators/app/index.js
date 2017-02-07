/* eslint-disable no-unused-vars */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');

let {
  files,
  templates,
  options,
  prompts,
  folder
} = require(path.join(__dirname) + '/config.js');

module.exports = yeoman.extend({
  initializing() {
    this.pkg = require(path.join(__dirname) + '/../../package.json');
      this.log(yosay(
        '==INIT===' + this.pkg.description
      ));
  },

  constructor: function () {
    yeoman.apply(this, arguments);

    options.forEach(({ name, desc, defaults }) => {
      this.option(name, {
        desc,
        defaults,
      });
    });
  },

  prompting() {
    this.log(yosay(
      '==PATH: ' + this.destinationRoot() + ' ====!'
    ));

    return this.prompt(prompts).then(function (props) {
      this.props = props; // this.config.set('appName', this.appName);
    }.bind(this));
  },

  welcome() {
    this.log(yosay(
      'Welcome ' + chalk.red('api') + ' generator!' + this.props.buildType
    ));
  },

  writing() {
    templates.forEach(({ v, arg }) => {
      this.fs.copyTpl(
        this.templatePath(`_${v}`),
        this.destinationPath(v),
        arg
      );
    });

    files.forEach((v) => {
      this.fs.copy(
        this.templatePath(`_${v}`),
        this.destinationPath(v)
      );
    });

    folder.forEach((v) => {
      fs.copy(
        this.templatePath(`_${v}`),
        this.destinationPath(v)
      );
    });
  },

  displayName() {
    this.log('Creating ' + this.appName + ' app based on RAML.');
  },

  install() {
    this.npmInstall();
  }
});
