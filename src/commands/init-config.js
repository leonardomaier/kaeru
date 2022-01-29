const { existsSync, readFileSync, writeFileSync } = require('fs');

class InitConfig {
  static handler(configName, templatePath = null) {
    if (!existsSync(`./${configName}`)) {
      const templateFilePath = templatePath || `${process.cwd()}/src/assets/template.yaml`;
      const templateContent = readFileSync(templateFilePath).toString();
      writeFileSync(`./${configName}.yaml`, templateContent);
    }
  }
}

module.exports = {
  InitConfig,
};
