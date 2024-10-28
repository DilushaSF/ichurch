const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const port = 3000;
const con_string =
  "mongodb+srv://sindutharu821:ichurch123@ichurch.inzey.mongodb.net/?retryWrites=true&w=majority&appName=ichurch";

mongoose.connect(con_string).then(() => {
  console.log("DB connected");
});

const schema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const user = mongoose.model("user", schema);

app.get("/", async (req, res) => {
  // res.send("Hello World!");

  // const result = await mongoose.connection.dropDatabase
  mongoose.connect(con_string).then(() => {
    console.log("DB connected");
  });

  // mongoose
  //   .connect(con_string)
  //   .then(() => {
  //     return mongoose.connection.dropDatabase();
  //   })
  //   .then(() => {
  //     console.log("Database deleted");
  //   })
  //   .catch((error) => console.log("Error: " + error));
});

app.post("/signup", (req, res) => {
  const usersList = req.body;
  console.log(usersList);

  const newUser = new user({
    fullName: usersList.fullName,
    email: usersList.email,
    password: usersList.password,
  });

  newUser
    .save()
    .then(() => console.log("User Added"))
    .catch((err) => console.log("Error: " + err));
  // Send a response to client that will show that the request was successfull.

  res.send({
    message: "A New user was added.",
  });
});

app.post("/signin", (req, res) => {
  const loginUser = req.body;
  console.log(loginUser);

  const user = new user({
    fullName: usersList.fullName,
    email: usersList.email,
    password: usersList.password,
  });

  newUser
    .save()
    .then(() => console.log("User Added"))
    .catch((err) => console.log("Error: " + err));

  res.send({
    message: "A New user was logged in.",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
