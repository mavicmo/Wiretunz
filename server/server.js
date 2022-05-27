//require everything
const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const app = express();

//Port to run backend server
const port = 3001 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRoute);

app.listen(port, () => {
  console.log("listening on port " + port);
});
