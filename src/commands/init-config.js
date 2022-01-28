const { existsSync, readFileSync, writeFileSync } = require("fs");

class InitConfig {
  static handler(configName) {
    if (!existsSync(`./${configName}`)) {
      const templateContent = readFileSync(process.cwd() + '/src/assets/template.yaml').toString();
      writeFileSync(`./${configName}.yaml`, templateContent);
    }
  }
}

module.exports = {
  InitConfig
};