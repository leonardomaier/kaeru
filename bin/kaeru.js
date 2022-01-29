#!/usr/bin/env node
const { Command } = require('commander');
const { InitConfig } = require('../src/commands/init-config');
const { InitTemplate } = require('../src/commands/init-template');
const { RunCommand } = require('../src/commands/run-command');

const { version } = require('../package.json');

const program = new Command();

program.version(version);

program
  .command('run-command')
  .description('run command defined in YAML file')
  .argument('<command>', 'name of the command defined in the YAML')
  .requiredOption('-c, --config <config>', 'YAML file to be read')
  .option('-v, --vars <vars>', 'Variables to be used for replacing on file (--vars "example=test,another=test")', '')
  .action((name, options) => { RunCommand.handler({ ...options, name }); });

program
  .command('new-config')
  .description('creates new configuration file')
  .argument('<config-name>', 'name of the configuration file to be created')
  .action((name) => { InitConfig.handler(name); });

program
  .command('new-template')
  .description('creates new template file')
  .argument('<template-name>', 'name of the template file to be created')
  .action((name) => { InitTemplate.handler(name); });

program.parse(process.argv);
