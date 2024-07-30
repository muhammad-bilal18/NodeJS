const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('welcome');
        res.end();
    }

    if(req.url === '/hello') {
        res.write('hello world');
        res.end();
    }
});

server.listen(3000);