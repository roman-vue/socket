const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors")

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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
  }, 1000);

  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });
});

http.listen(3002, () => {
  console.log("Server listening on port 3000");
});
