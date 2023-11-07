import http  from 'http';

import app from "./app.js";

const port = process.env.PORT || 4300;

const server = http.createServer(app);

server.listen(port,  '0.0.0.0',() => {
  console.log(`---- Server running on port [${port}]----`);
});

