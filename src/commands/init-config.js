const { existsSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');

class InitConfig {
  static handler(configName) {
    if (!existsSync(`./${configName}`)) {
      const templatePath = path.resolve(__dirname, '../assets/template.yaml');
      const templateContent = readFileSync(templatePath).toString();
      writeFileSync(`./${configName}.yaml`, templateContent);
    }
  }
}

module.exports = {
  InitConfig,
};
