const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A client connected.');

  // Enviar mensaje de error repetidamente
  setInterval(() => {
    const errorObj = {
      t: 'callOut',
      usr: 'sa',
      data: '24/05/2023 04:09:26 p. m.: ERROR',
    };
    socket.emit('error', errorObj);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

http.listen(30001, () => {
  console.log('Server listening on port 3000');
});
