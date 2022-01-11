const fs = require('fs');
const path = require('path');

// make folder
// fs.mkdir(path.join(__dirname,'Test'), {}, (err) => {
//     if(err) throw err;
//     console.log('Created folder successfully');
// });

// create file and write to it
// fs.writeFile(path.join(__dirname, '/Test', 'hello.txt'), 'Hello World!',
// (err) => {
//     if(err) throw err;
//     console.log('File written...');
// });

// append content to file
// fs.appendFile(path.join(__dirname, '/Test', 'hello.txt'), 'Hello Gunjan!',
// (err) => {
//     if(err) throw err;
//     console.log('Content appended...');
// });

// read the file
// fs.readFile(path.join(__dirname, '/Test', 'hello.txt'), 'utf-8', 
// (err, data) => {
//     if(err) throw err;
//     console.log('Read data..', data);
// });

// renaming the file
fs.rename(path.join(__dirname, '/Test', 'hello.txt'), path.join(__dirname, '/Test', 'newhello.txt') ,
 (err) => {
     if(err) throw err;
     console.log('Rename File...');
 });