const fs = require('fs').promises;
const path = require('path');

const getDirPath = (foldername) => path.join(__dirname, foldername);
const getFilePath = (dirPath, filename) => path.join(dirPath, filename);

const secretFolderPath = getDirPath('secret-folder');

const showFolderData = async () => {
  const files = await fs.readdir(secretFolderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = getFilePath(secretFolderPath, file.name);
    if (file.isFile()) {
      const stats = await fs.stat(filePath);
      const fileName = path.parse(file.name).name;
      const fileExt = path.parse(file.name).ext.slice(1);
      const fileSize = stats.size;
      console.log(`${fileName} - ${fileExt} - ${fileSize / 1000}kb`);
    }
  }
};

showFolderData();
