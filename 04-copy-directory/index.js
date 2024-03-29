const fs = require('fs').promises;
const path = require('path');

const getDirPath = (foldername) => path.join(__dirname, foldername);
const getFilePath = (dirPath, filename) => path.join(dirPath, filename);

const srcDirPath = getDirPath('files');
const destDirPath = getDirPath('files-copy');

const copyDir = async (src, dest) => {
  try {
    await fs.rm(dest, { recursive: true });
  } catch (error) {
    null;
  }
  await fs.mkdir(dest, { recursive: true });

  const files = await fs.readdir(src);

  for (const file of files) {
    const srcFilePath = getFilePath(src, file);
    const destFilePath = getFilePath(dest, file);
    const stats = await fs.stat(srcFilePath);

    if (stats.isDirectory()) {
      await copyDir(srcFilePath, destFilePath);
    } else {
      await fs.copyFile(srcFilePath, destFilePath);
    }
  }
};

copyDir(srcDirPath, destDirPath);
