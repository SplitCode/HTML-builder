const fs = require('fs').promises;
const path = require('path');

const getDirPath = (foldername) => path.join(__dirname, foldername);
const getFilePath = (dirPath, filename) => path.join(dirPath, filename);

const styleFolder = getDirPath('styles');
const projectFolder = getDirPath('project-dist');
const bundlerFile = getFilePath(projectFolder, 'bundle.css');

const bundler = async () => {
  const files = await fs.readdir(styleFolder);

  const styleArray = [];

  for (const file of files) {
    const filePath = getFilePath(styleFolder, file);

    const stats = await fs.stat(filePath);

    if (stats.isFile() && path.extname(file).toLowerCase() === '.css') {
      const fileData = await fs.readFile(filePath, 'utf-8');
      styleArray.push(fileData);
    }
  }

  await fs.writeFile(bundlerFile, styleArray.join('\n'), 'utf-8');
};

bundler();
