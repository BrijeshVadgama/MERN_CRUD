const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected With Database \nDB_PORT:: ${connect.connection.port} \nHOST:: ${connect.connection.host} \nDATABASE:: ${connect.connection.name}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
