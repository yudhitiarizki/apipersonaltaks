const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb+srv://yudhit:mulyono59@cluster0.o2ncf.mongodb.net/?retryWrites=true&w=majority")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;