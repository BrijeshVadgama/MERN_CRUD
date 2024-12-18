const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongoConnection");
const UsersRoute = require("./routes/users.routes.js");
const PORT = process.env.PORT || 5001;

const app = express();

const allowOrigins = ["http://localhost:5173"];
app.use(cors({ credentials: true, origin: allowOrigins }));

connectDB();

app.use(express.json());

/// -- api end points
app.use("/api/users", UsersRoute);

app.listen(PORT, () => {
  console.log(
    `Server is running on PORT:: ${PORT} \nAPI URL:: http://localhost:${PORT}`
  );
});
