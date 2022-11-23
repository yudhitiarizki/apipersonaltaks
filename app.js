const express = require('express');
const Routers = require('./routes/index');

const connect = require("./schemas");
connect();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", [Routers]);

app.listen(port, () => {
  console.log(port, 'Server is open with port!');
});