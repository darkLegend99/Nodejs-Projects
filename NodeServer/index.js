const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url === '/'){

        // 1st method
        // res.writeHead(200, {'content-Type': 'text/html'});
        // res.end('<h1>This is our Home page</h1>');

        // 2nd method
        fs.readFile(
            path.join(__dirname, 'public', 'index.html'),
            (err, content) => {
                if(err) throw err;
                res.writeHead(200, {'content-Type': 'text/html'});
                res.end(content);
            }
        )
    }

    // 3rd method
    // if(req.url === '/api/users'){
    //     const users = [
    //         {name: 'Gunjan', age: 21},
    //         {name: 'Divya', age: 18}
    //     ]
    // if we use applications/users as content-Type then json file will be downloaded from the browser
    // res.writeHead(200, {'content-Type': 'application/json'});
    // res.end(JSON.stringify(users));
    // }

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/'? 'index.html': req.url)

    // extension of file
    let extname = path.extname(filePath);

    // initial content type
    let contentType = 'text/html';

    // check extension and set content type
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // read file
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                // page not found
                fs.readFile(path.join(__dirname, 'public', 'notFound.html'),
                (err, content) => {
                    res.writeHead(200, {'content-Type': 'text/html'});
                    res.end(content, 'utf-8');
                })
            } else {
                // some server error
                res.writeHead(500);
                res.end(`server error ${err.code}`);
            }
        } else {
            // success (to display about page url need about.html not only about)
            res.writeHead(200, {'content-Type': contentType});
            res.end(content, 'utf-8');
        }
    })

});

const Port = process.env.PORT || 5000;

server.listen(Port, () => {
    console.log(`server is running on port ${Port}`)
});