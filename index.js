const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

var things = require("./methods.js");
app.use("/methods", things);

const cors = require("cors");
const corsOptions = {origin: "http://127.0.0.1:8080"}; // Your frontend URL };
app.use(cors(corsOptions));

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
  marriedChurch: String,
});

const User = mongoose.model("user", schema_signup);
const Member = mongoose.model("member_registration", schema_memberreg);

const users = [
  {email: "dilusha@gmail.com", password: "123"},
  {email: "romesh@gmail.com", password: "456"},
];

app.get("/", async (req, res) => {
  mongoose.connect(con_string).then(() => {
    console.log("DB connected");
  });
});

//signup process
app.post("/signup", (req, res) => {
  const usersList = req.body;
  console.log(usersList);

  const newUser = new User({
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

// get All users
app.get("/users/get/all", (req, res) => {
  res.json(users);
});

//sign in process
app.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.json({success: true});
  } else {
    res.status(404).json({message: "Invalid Credentials"});
  }
});

app.listen(port, () => {
  console.log(`iChurch listening on port ${port}`);
});

//new member registration
app.post("/member-registration/create", (req, res) => {
  const memberDetails = req.body;
  console.log(memberDetails);

  const newMember = new Member({
    firstName: memberDetails.firstName,
    middleName: memberDetails.middleName,
    sirName: memberDetails.sirName,
    dob: memberDetails.dob,
    nameOfMother: memberDetails.nameOfMother,
    nameOfFather: memberDetails.nameOfFather,
    address: memberDetails.address,
    birthPlace: memberDetails.birthPlace,
    contactNo: memberDetails.contactNo,
    marriedDate: memberDetails.marriedDate,
    marriedChurch: memberDetails.marriedChurch,
  });

  newMember
    .save()
    .then(() => console.log("Member was Added"))
    .catch((err) => console.log("Error: " + err));

  res.send({
    message: "A New member was registered.",
  });
});

// get member by id
app.get("/member-registration/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).send({message: "Member not found."});
    }
    res.send({member});
  } catch (err) {
    console.error("Error fetching member: ", err);
    res.status(500).send("Error fetching member");
  }
});

//update registered memebers
app.put("/update-member-registration/:id", async (req, res) => {
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

//delete members
app.delete("/member-registration/delete/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).send({message: "Member not found."});
    }
    res.send({message: "Member deleted successfully.", deletedMember});
  } catch (err) {
    console.error("Error deleting member: ", err);
    res.status(500).send("Error deleting member");
  }
});

//search memebers
app.get("/member-registration/get/all", async (req, res) => {
  const searchCriteria = req.query;

  try {
    const members = await Member.find(searchCriteria);
    if (members.length === 0) {
      return res.status(404).send({message: "No members found."});
    }

    res.send(members);
  } catch (err) {
    console.error("Error searching for members: ", err);
    res.status(500).send("Error searching for members");
  }
});

// get all members
app.get("/member-registration", async (req, res) => {
  try {
    const members = await Member.find({});
    res.send(members);
  } catch (err) {
    console.error("Error retrieving members: ", err);
    res.status(500).send("Error retrieving members");
  }
});
