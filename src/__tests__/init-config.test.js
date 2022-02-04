const fs = require('fs');
const path = require('path');
const { InitConfig } = require('../commands/init-config');

jest.mock('fs');

describe('InitConfigTest', () => {
  it('should create a configuration file', () => {
    const MOCK_FILE_PATH = 'path/to/file1';

    const MOCK_TEMPLATE_PATH = path.resolve(__dirname, '../assets/template.yaml');

    fs.writeFileSync(MOCK_TEMPLATE_PATH, 'template');

    InitConfig.handler(MOCK_FILE_PATH, MOCK_TEMPLATE_PATH);

    const expectedFiles = fs.readdirSync('./path/to');

    expect(expectedFiles.length).toBe(1);
  });
});
