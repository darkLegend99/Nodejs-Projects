const path = require('path');

// get the file name
console.log(path.basename(__filename));

// get the directory name
console.log(path.dirname(__filename));

//get the extension
console.log(path.extname(__filename));

// create an object
console.log(path.parse(__filename).base);

// join ../Test/hello.html
console.log(path.join(__dirname, 'Test', 'hello.html'));