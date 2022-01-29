const {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} = require('fs');
const { load } = require('js-yaml');
const { convertVariablesFromCliCommand } = require('../shared/functions');

class RunCommand {
  static handler(options) {
    if (!existsSync(options.config)) {
      throw Error('YAML file not found');
    }

    const configurationFile = readFileSync(options.config, 'utf-8');

    if (!configurationFile) {
      console.log('configuration file not found');
      return;
    }

    const configuration = load(configurationFile);

    const { commands } = configuration;

    const command = options.name in commands ? commands[options.name] : null;

    if (!command) {
      console.log('command not found');
      return;
    }

    let folderPath = `${configuration.projectPath}${command.path}`;

    const replaceVariables = (content, variables) => {
      let newContent = content;

      Object.keys(variables).forEach((variableName) => {
        const variableValue = variables[variableName];
        const regex = new RegExp(`\\$\\{${variableName}\\}`, 'g');
        newContent = newContent.replace(regex, variableValue);
      });

      return newContent;
    };

    const optionVars = convertVariablesFromCliCommand(options.vars);

    const globalVariables = optionVars || configuration.globalVariables || {};

    if (command.folder) {
      folderPath += replaceVariables(command.folder, globalVariables);
    }

    if (!existsSync(folderPath)) {
      const recursive = folderPath.split('/').length > 0;

      mkdirSync(folderPath, { recursive });
    }

    if (!command.files || command.files.length <= 0) {
      console.log('no files found to create');
      return;
    }

    for (let i = 0; i < command.files.length; i += 1) {
      const { name, extension, template } = command.files[i];

      if (!template) {
        writeFileSync(`${folderPath}/${replaceVariables(name, globalVariables)}.${extension}`, '');
      } else {
        let templateContent = readFileSync(template.path).toString();

        const templateVariables = template.variables || {};

        const allVariables = { ...globalVariables, ...templateVariables };

        templateContent = replaceVariables(templateContent, allVariables);

        writeFileSync(`${folderPath}/${replaceVariables(name, globalVariables)}.${extension}`, templateContent);
      }
    }
  }
}

module.exports = {
  RunCommand,
};
