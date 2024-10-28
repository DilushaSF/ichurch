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

const schema_signup = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const schema_memberreg = new mongoose.Schema({
  firstName: String,
  middleName: String,
  sirName: String,
  dob: String,
  nameOfMother: String,
  nameOfFather: String,
  address: String,
  birthPlace: String,
  contactNo: String,
  marriedDate: String,
  marridChurch: String,
});

const user = mongoose.model("user", schema_signup);
const member = mongoose.model("member_registration", schema_memberreg);

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

//signup process
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

//sign in process
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

//new member registration
app.post("/member-registration", (req, res) => {
  const memberDetails = req.body;
  console.log(memberDetails);

  const newMember = new member({
    firstName: memberDetails.firstName,
    middleName: memberDetails.middleName,
    sirName: memberDetails.sirName,
    dob: memberDetails.dob,
    nameOfMother: memberDetails.nameOfFather,
    nameOfFather: memberDetails.nameOfFather,
    address: memberDetails.address,
    birthPlace: memberDetails.birthPlace,
    contactNo: memberDetails.contactNo,
    marriedDate: memberDetails.marriedDate,
    marridChurch: memberDetails.marridChurch,
  });

  newMember
    .save()
    .then(() => console.log("Member was Added"))
    .catch((err) => console.log("Error: " + err));
  // Send a response to client that will show that the request was successfull.

  res.send({
    message: "A New member was registered.",
  });
});

app.patch("/member/:id", async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedMember) {
      return res.status(404).send({message: "Member not found."});
    }
    res.send({message: "Member updated successfully.", updatedMember});
  } catch (err) {
    console.error("Error updating member: ", err);
    res.status(500).send("Error updating member");
  }
});
