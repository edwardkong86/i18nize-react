const fs = require('fs');
const path = require('path');

// TODO: Ignore all directories listed in .gitignore
const checkIfDirectoryShouldBeIgnored = fullPath => !!fullPath
  .match(/node_modules/);

// TODO: Ignore all directories listed in .gitignore
const checkIfFileShouldBeIgnored = (fullPath) => {
  const hasJsExtension = fullPath.trim().match(/\.[jt]sx?$/);
  const isTestFile = fullPath.trim().match(/(test.[jt]sx?|spec.[jt]sx?)/);

  const isMinJsFile = fullPath.trim().match(/min.[jt]sx?/);

  return !(hasJsExtension && !isTestFile && !isMinJsFile);
};

const walk = (rootDir, allFiles = []) => {
  const files = fs.readdirSync(rootDir);
  files.forEach((file) => {
    const fullPath = path.join(rootDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!checkIfDirectoryShouldBeIgnored(fullPath)) {
        walk(fullPath, allFiles);
      }
    } else if (!checkIfFileShouldBeIgnored(fullPath)) {
      allFiles.push(fullPath);
    }
  });
  return allFiles;
};

module.exports = {
  walk,
  checkIfDirectoryShouldBeIgnored,
  checkIfFileShouldBeIgnored,
};
