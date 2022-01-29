/* eslint-disable no-underscore-dangle */
const path = require('path');

const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);

  Object.keys(newMockFiles).forEach((file) => {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  });
}

function __getMockFilesLength(dir) {
  if (!dir) return 0;
  return mockFiles[dir].length || 0;
}

function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function writeFileSync(file, content) {
  __setMockFiles({ [file]: content });
}

fs.__setMockFiles = __setMockFiles;
fs.__getMockFilesLength = __getMockFilesLength;
fs.readdirSync = readdirSync;
fs.writeFileSync = writeFileSync;
fs.readFileSync = (filePath) => ({
  toString: () => filePath,
});

module.exports = fs;
