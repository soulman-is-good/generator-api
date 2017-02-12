/* eslint-disable no-unused-vars */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');
var path = require('path');
var inquirer = require('inquirer');

let {
  files,
  folder,
  templates,
  options,
  createItem,
} = require(path.join(__dirname) + '/config.js');

module.exports = yeoman.extend({
  initializing() {
    this.pkg = require(path.join(__dirname) + '/../../package.json');
    this.log(yosay(
      `RAML api generator v.${this.pkg.version}`
    ));
  },

  constructor: function () {
    yeoman.apply(this, arguments);

    options.forEach(({name, desc, defaults}) => {
      this.option(name, {
        desc,
        defaults,
      });
    });

    this.api = {
      name: 'mock-api',
      version: '0.0.1',
      baseUrl: 'https://example.com/api',
      apiRoot: 'root',
      desc: 'Local API based on raml',
      apiItem: createItem(),
    };
  },

  prompting() {
    this.log('root: ', this.destinationRoot());
    let greeting = 'Your project';
    let dots = '...';
    let doneConfig = false;

    let prompts = [{
      type: 'input',
      name: 'name',
      message: `${greeting} name`,
      default: this.api.name
    }, {
      type: 'input',
      name: 'desc',
      message: `${dots} description`,
      default: this.api.desc
    }, {
      type: 'input',
      name: 'version',
      message: `${dots} version`,
      default: this.api.version
    }, {
      type: 'input',
      name: 'baseUrl',
      message: `${dots} baseUrl`,
      default: this.api.baseUrl
    }, {
      type: 'input',
      name: 'apiRoot',
      message: `${dots} apiRoot`,
      default: this.api.apiRoot
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'Create API item?',
      choices: [{
        name: 'Item',
        value: 'includeItem',
        checked: true
      }, {
        name: 'Item Collection',
        value: 'includeCollection',
        checked: true
      }, {
        name: 'Item getByID',
        value: 'includeGetByID',
        checked: true
      }]
    }];

    // TODO WHILE
    // return inquirer.prompt(prompts).then(function (answers) {
    //   this.props = answers;
    //   this.apiConfig = this.api;
    //   this.apiConfig.apiItem = createItem(
    //     'user2',
    //     'collection',
    //     'userSchema',
    //     'userExample'
    //   );
    // }.bind(this));

    return this.prompt(prompts).then(function (answers) {
      this.props = answers;
      this.apiConfig = this.api;
      this.apiConfig.apiItem = createItem(
        'user2',
        'collection',
        'userSchema',
        'userExample'
      );
    }.bind(this));
  },

  default() {
    this.log(yosay(
      'Default compose here'
    ));

    // this.composeWith(require.resolve('generator-node/generators/app'), {
    //   babel: false,
    //   boilerplate: false,
    //   name: this.props.name,
    //   projectRoot: 'generators',
    //   skipInstall: this.options.skipInstall,
    //   readme: readmeTpl({
    //     generatorName: this.props.name,
    //     yoName: this.props.name.replace('generator-', '')
    //   })
    // });
    //
    // this.composeWith(require.resolve('../subgenerator'), {
    //   arguments: ['app']
    // });
  },

  welcome() {
    this.log(yosay(
      `Welcome ${chalk.red('api')} generator! ${this.props.desc}`
    ));
  },

  writing() {
    templates.forEach((v) => {
      v.arg = this.apiConfig;
    });

    templates.forEach(({from, to, arg}) => {
      this.fs.copyTpl(
        this.templatePath(from),
        this.destinationPath(to),
        arg
      );
    });

    files.forEach(({from, to}) => {
      this.fs.copy(
        this.templatePath(from),
        this.destinationPath(to)
      );
    });

    folder.forEach(({from, to}) => {
      fs.copy(
        this.templatePath(from),
        this.destinationPath(to)
      );
    });
  },

  displayName() {
    this.log(`Creating ${this.appName} app based on RAML.`);
  },

  install() {
    this.npmInstall();
  }
});
