/* eslint-disable no-unused-vars */
'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');

module.exports = Generator.extend({
  initializing() {
    this.pkg = require('../../package.json');
      this.log(yosay(
        '==INIT===' + this.pkg.description
      ));
  },

  constructor: function () {
    Generator.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
  },

  prompting() {
    this.log(yosay(
      '==PATH: ' + this.destinationRoot() + ' ====!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'buildType',
      message: 'Light version?',
      default: true
      }, {
      type: 'checkbox',
      name: 'features',
      message: 'Data model blueprint?',
      choices: [{
        name: 'User',
        value: 'includeUser',
        checked: true
      }, {
        name: 'Location',
        value: 'includeLocation',
        checked: true
      }, {
        name: 'Other',
        value: 'includeOther',
        checked: true
      }]
    }];

    return this.prompt(prompts).then(function (props) {
      // this.config.set('appName', this.appName);

      this.props = props;
    }.bind(this));
  },

  welcome() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome ' + chalk.red('api') + ' generator!' + this.props.buildType
    ));
  },

  writing() {
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copyTpl(
      this.templatePath('_v1-spec.raml'),
      this.destinationPath('v1-spec.raml'),
      { title: 'Templating with Yeoman' }
    );

    // // shared across all generators
    // this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
    // glob.sync('**', { cwd: this.sourceRoot() }).map(function (file) {
    //   this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace(/^_/, '')), this);
    // }, this);
    //
    // // shared for mvc/basic generators
    // this.sourceRoot(path.join(__dirname, 'templates', name + '-shared'));
    // this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this);
    //DONE: fs.copy(this.templatePath('_api/'), this.destinationPath('api/'));
  },

  displayName() {
    this.log('Creating ' + this.appName + ' app based on HotTowel.');
  },

  packageFiles() {

  },

  install() {
    this.npmInstall(); // this.installDependencies({ bower: false });
  }
});

// Prompt blueprints
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


 // [{
 //   type: 'list',
 //   name: 'legacyBootstrap',
 //   message: 'Which version of Bootstrap would you like to include?',
 //   choices: [{
 //     name: 'Bootstrap 3',
 //     value: true
 //   }, {
 //     name: 'Bootstrap 4',
 //     value: false
 //   }],
 //   when: function (answers) {
 //     return answers.features.indexOf('includeBootstrap') !== -1;
 //   }
 // }, {
 //   type: 'confirm',
 //   name: 'includeJQuery',
 //   message: 'Would you like to include jQuery?',
 //   default: true,
 //   when: function (answers) {
 //     return answers.features.indexOf('includeBootstrap') === -1;
 //   }
 // }];
 */
