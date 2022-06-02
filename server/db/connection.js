const mongoose = require("mongoose");

const mongoURI =
  //check if the node environment is production
  process.env.NODE_ENV === "production"
    ? //if so, use DB_URL as the database location
      process.env.DB_URL
    : //if not, use the book-e db on the MongoDB's local server
      "mongodb+srv://mtaraq:mtaraq@cluster0.eqoyi.mongodb.net/project3?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log("Connection failed!", error));

module.exports = mongoose;
