const express = require('express')
const app = express()
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

app.get('/', (req, res) => res.send('Hello World!'))


// first branch commit

// other more add


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }


} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}

//app.listen(3000, () => console.log('Example app listening on port 3000!'))