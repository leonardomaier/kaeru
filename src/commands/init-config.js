const { existsSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');

const EXTENSION = '.yaml';

class InitConfig {
  static handler(configName) {
    if (!existsSync(`./${configName}${EXTENSION}`)) {
      const templatePath = path.resolve(__dirname, '../assets/template.yaml');
      const templateContent = readFileSync(templatePath).toString();
      writeFileSync(`./${configName}${EXTENSION}`, templateContent);
    }
  }
}

module.exports = {
  InitConfig,
};
