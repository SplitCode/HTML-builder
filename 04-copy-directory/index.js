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
    return;
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

// 1. Импортируйте все необходимые модули.
// 2. Создайте папку `files-copy`, если она еще не существует.
// 3. Прочитайте содержимое папки `files`.
// 4. Скопируйте файлы из папки `files` в папку `files-copy`.
