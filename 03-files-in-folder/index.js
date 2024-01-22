const fs = require('fs').promises;
const path = require('path');

const getFilePath = (dirname, filename) =>
  path.join(__dirname, dirname, filename);
const secretFolderPath = path.join(__dirname, 'secret-folder', '');

const showFolderData = async () => {
  const files = await fs.readdir(secretFolderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = getFilePath('secret-folder', file.name);
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
