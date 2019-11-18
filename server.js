//IMPORTS
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const log = console.log;
const PORT = process.env.PORT || 3000;

const routes = require("./routes");
const userRoutes = require("./routes/Users");

//DATABASE CONNECT
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/some_database",
  {
    useNewUrlParser: true
  }
);

//ROUTES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);
app.use("/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); //relative path
  });
}

app.listen(PORT, () => {
  log(`Server is starting at PORT: ${PORT}`);
});
