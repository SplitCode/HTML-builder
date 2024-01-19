const fs = require('fs');
const path = require('path');

const getFilePath = (filename) => path.join(__dirname, filename);
const textPath = getFilePath('text.txt');

const readStream = fs.createReadStream(textPath);

readStream.pipe(process.stdout);
