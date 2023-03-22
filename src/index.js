const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, 'OK', { "Content-Type": "application/json" })
    res.write(JSON.stringify({ message: "hello world" }))
    res.end();
    return;
  }
  res.writeHead(404, 'Not Found', { "Content-Type": "application/json" })
  res.end(JSON.stringify({ message: "nope" }));
})

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`server on ${PORT}`);
})