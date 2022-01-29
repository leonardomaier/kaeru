const { existsSync, writeFileSync, readFileSync } = require('fs');
const path = require('path');

const EXTENSION = '.kaeru';

class InitTemplate {
  static handler(templateName) {
    if (!existsSync(`./${templateName}${EXTENSION}`)) {
      const templatePath = path.resolve(__dirname, `../assets/template${EXTENSION}`);
      const templateContent = readFileSync(templatePath).toString();
      writeFileSync(`./${templateName}${EXTENSION}`, templateContent);
    }
  }
}

module.exports = {
  InitTemplate,
};
