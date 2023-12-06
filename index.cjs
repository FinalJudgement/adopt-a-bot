const express = require("express");
const app = express();

const client = require("./db/client.cjs");
client.connect();

app.use("/assets", express.static(__dirname + "/dist/assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
