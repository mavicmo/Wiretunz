const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://mtaraq:mtaraq@cluster0.eqoyi.mongodb.net/project3?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log("Connection failed!", error));

module.exports = mongoose;
