const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("fs");
const { load } = require('js-yaml');

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

    const command = options.name in configuration.commands ? configuration.commands[options.name] : null;

    if (!command) {
      console.log('command not found');
      return;
    }

    let folderPath = `${configuration.projectPath}${command.path}`;

    const replaceVariables = (content, variables) => {

      let newContent = content;

      Object.keys(variables).forEach(variableName => {
        const variableValue = variables[variableName];
        const regex = new RegExp('\\$\\{' + variableName + '\\}', 'g');
        newContent = newContent.replace(regex, variableValue);
      });

      return newContent;
    }

    if (command.folder) {
      folderPath += replaceVariables(command.folder, configuration.globalVariables);
    }

    if (!existsSync(folderPath)) {

      const recursive = folderPath.split("/").length > 0;

      mkdirSync(folderPath, { recursive });
    }

    if (!command.files || command.files.length <= 0) {
      console.log('no files found to create');
      return;
    }

    for (let i = 0; i < command.files.length; i++) {

      const { name, extension, template } = command.files[i];

      if (!template) {
        writeFileSync(`${folderPath}/${replaceVariables(name, configuration.globalVariables)}.${extension}`, '');
        continue;
      }

      let templateContent = readFileSync(template.path).toString();

      if (!template.variables || template.variables.length <= 0) {
        return;
      }

      templateContent = replaceVariables(templateContent, configuration.globalVariables);

      writeFileSync(`${folderPath}/${replaceVariables(name, configuration.globalVariables)}.${extension}`, templateContent);
    }
  }
}

module.exports = {
  RunCommand
};