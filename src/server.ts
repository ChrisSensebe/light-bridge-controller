const http = require('http');
const port = process.env.port || 8080;

const server = http.createServer((req, res) => res.end('hello world'));
server.listen(port, err => err ? console.log(`Oups, ${err}`) : console.log(`server listening on ${port}`));
