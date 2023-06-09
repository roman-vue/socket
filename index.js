const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
  cors:{
    origins: ['http://localhost:4200']
  }
});


io.on("connection", (socket) => {
  console.log("A client connected.");

  // Enviar mensaje de error repetidamente
  setInterval(() => {
    const errorObj = {
      t: "callOut",
      usr: "sa",
      data: "24/05/2023 04:09:26 p. m.: ERROR",
    };
    const infoObj = {
      t: "callOut",
      usr: "sa",
      data: "24/05/2023 04:09:26 p. m.: INFO",
    };
    const monitObj = {
      inProcess: 0,
      ordersDetail: [
        {
          usuario: "sa",
          callOrders: 0,
        },
        {
          usuario: "usuario",
          callOrders: 0,
        },
      ],
    };
    const monitSmsObj = {
      cantsms: 1,
    };
    socket.emit("error", errorObj);
    socket.emit("info", infoObj);
    socket.emit("monit", monitObj);
    socket.emit("monit_sms", monitSmsObj);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
});

io.of('/test')
.on("connection", (socket)=>{
  console.log("A client connected.");
  let count = 0
  setInterval(() => {
    const errorObj = {
      t: "callOut",
      usr: "sa",
      data: `${new Date().toLocaleTimeString()}: Error-TEST `
    };
    const infoObj = {
      t: "callOut",
      usr: "sa",
      data: `${new Date().toLocaleTimeString()}: Error-TEST `,
    };
    const monitObj = {
      inProcess: count++,
      ordersDetail: [
        {
          usuario: "sa",
          callOrders: count++,
        },
        {
          usuario: "TESTER",
          callOrders: count++,
        },
      ],
    };
    const monitSmsObj = {
      cantsms: count++,
    };
    socket.emit("error", errorObj);
    socket.emit("info", infoObj);
    socket.emit("monit", monitObj);
    socket.emit("monit_sms", monitSmsObj);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
})

http.listen(3002, () => {
  console.log("Server listening on port 3000");
});
