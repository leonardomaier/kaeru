#!/usr/bin/env node
const { Command } = require('commander');
const { InitConfig } = require('../src/commands/init-config');
const { RunCommand } = require('../src/commands/run-command');

const program = new Command();

program.version('0.0.1');

program
  .command('run-command')
  .description('run command defined in YAML file')
  .argument('<command>', 'name of the command defined in the YAML')
  .requiredOption('-c, --config <config>', 'YAML file to be read')
  .option('-v, --vars <vars>', 'Variables to be used on command, json-only', '')
  .action((name, options) => { RunCommand.handler({ ...options, name }); });

program
  .command('new')
  .description('creates new configuration file')
  .argument('<config-name>', 'name of the configuration file to be created')
  .action((name) => { InitConfig.handler(name); });

program.parse(process.argv);
