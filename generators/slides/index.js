'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {

  start(){
    this.log(yosay(
      'Welcome to the kickass ' + chalk.red('Moebiusmania SLIDES') + ' generator!'
    ));
  }

  prompts(){
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What would you like this presentation to be called?',
      default: 'sample-slides'
    }];

    return this.prompt(prompts).then((props) => {
      this.props = props;
      const date = new Date();
      this.props.year = date.getFullYear();
    });
  }

  create(){
    const name = this.props.name;

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(name),
      this.props,
      {},
      {globOptions: {dot: true}}
    );
  }

  install() {
    const dir = `${process.cwd()}/${this.props.name}`;
    process.chdir(dir);

    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

};