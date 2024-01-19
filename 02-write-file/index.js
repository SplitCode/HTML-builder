const fs = require('fs');
const path = require('path');
const readline = require('readline');

const getFilePath = (filename) => path.join(__dirname, filename);

const writePath = getFilePath('textFile.txt');
const writeStream = fs.createWriteStream(writePath, { flags: 'a' });

console.log(
  'Hello! Please, enter your text.\nIf you want to complete the input, type "exit" or press "Ctrl+C"',
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
  }
});

rl.on('close', () => {
  console.log('Bye! Have a good day!');
  rl.close();
});

process.on('SIGINT', () => {
  console.log('Bye! Have a good day!');
  rl.close();
});

// Шаги для выполнения задачи следующие:

// 1. Импортируйте все необходимые модули.
// 2. Создайте доступный для записи поток в текстовый файл.
// 3. Отобразите приветственное сообщение в консоли.
// 4. Дождитесь ввода пользователем с последующей проверкой на наличие ключевого слова `exit`.
// 5. Запишите введенный текст в файл.
// 6. Дождитесь дальнейшего ввода.
// 7. Отправьте прощальное сообщение, когда процесс будет остановлен.
