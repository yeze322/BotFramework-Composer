// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

const server = require('http').createServer();
const io = require('socket.io')(server);

const { HitTrigger } = require('./RuntimeSocketEvents');

io.on('connect', socket => {
  console.log('connect', socket.conn.id);

  setInterval(() => {
    socket.emit(HitTrigger, 'triggers[0]');
  }, 2000);

  setTimeout(() => {
    setInterval(() => {
      socket.emit(HitTrigger, 'triggers[1]');
    }, 2000);
  }, 1000);
});

server.listen(4001);
