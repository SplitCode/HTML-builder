const fs = require('fs').promises;
const path = require('path');

const getFilePath = (filename) => path.join(__dirname, filename);
const secretFolderPath = getFilePath('');

const showData = () => {
  fs.readdir(secretFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return;
    }

    files.forEach((file) => {
      const filePath = getFilePath(file.name);
      if (file.isFile()) {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            return;
          }
          const fileName = path.parse(file.name).name;
          const fileExt = path.parse(file.name).ext;
          const fileSize = stats.size;
          console.log(`${fileName} - ${fileExt} - ${fileSize}`);
        });
      }
    });
  });
};

showData();

// 1. Импортируйте все необходимые модули.
// 2. Прочитайте содержимое секретной папки.
// 3. Извлеките данные для каждого объекта в секретной папке.
// 4. Проверьте, является ли объект файлом.
// 5. Отобразите данные файла в консоли.

/* <file name>-<file extension>-<file size></file> */
