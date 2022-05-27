//require everything
const express = require("express");
const cors = require("cors");

//Port to run backend server
const port = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("listening on port " + port);
});
