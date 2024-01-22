const fs = require('fs').promises;
const path = require('path');

const getDirPath = (foldername) => path.join(__dirname, foldername);
const getFilePath = (dirPath, filename) => path.join(dirPath, filename);

const templatePath = getFilePath(__dirname, 'template.html');
const styleFolderPath = getDirPath('styles');
const componentFolderPath = getDirPath('components');
const projectFolderPath = getDirPath('project-dist');
const newHtmlFilePath = getFilePath(projectFolderPath, 'index.html');
const newCssFilePath = getFilePath(projectFolderPath, 'style.css');
const assetsFolderPath = getDirPath('assets');
const copyAssetsFolderPath = getFilePath(projectFolderPath, 'assets');

const buildPage = async () => {
  await fs.mkdir(projectFolderPath, { recursive: true });

  const templateData = await fs.readFile(templatePath, 'utf-8');

  const tagNames = templateData.match(/{{\s*([a-zA-Z]+)\s*}}/g);

  let newHtmlFile;
  newHtmlFile = templateData;

  if (tagNames) {
    for (const tagName of tagNames) {
      const component = tagName.trim().slice(2, -2).trim();
      const componentFilePath = getFilePath(
        componentFolderPath,
        `${component}.html`,
      );

      const componentData = await fs.readFile(componentFilePath, 'utf-8');
      newHtmlFile = newHtmlFile.split(tagName).join(componentData);
    }
  }

  await fs.writeFile(newHtmlFilePath, newHtmlFile, 'utf-8');

  const styleFiles = await fs.readdir(styleFolderPath);
  const styleArray = [];

  for (const styleFile of styleFiles) {
    const filePath = getFilePath(styleFolderPath, styleFile);
    const stats = await fs.stat(filePath);

    if (stats.isFile() && path.extname(styleFile).toLowerCase() === '.css') {
      const fileData = await fs.readFile(filePath, 'utf-8');
      styleArray.push(fileData);
    }
  }

  await fs.writeFile(newCssFilePath, styleArray.join('\n'), 'utf-8');

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

  await copyDir(assetsFolderPath, copyAssetsFolderPath);
};

buildPage();

// Возможные шаги для выполнения задачи:

// 1. Импортируйте все необходимые модули.
// 2. Прочитайте и сохраните файл шаблона в переменной.
// 3. Найдите все имена тегов в файле шаблона.
// 4. Замените теги шаблона содержимым файлов компонентов.
// 5. Запишите измененный шаблон в файл `index.html` в папке `project-dist`.
// 6. Используйте скрипт, написанный в задаче **05-слияние стилей**, чтобы создать файл `style.css`.
// 7. Используйте скрипт из task **04-copy-directory**, чтобы переместить папку "assets" в папку "project-dist".
