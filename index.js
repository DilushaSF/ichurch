const mongoose = require("mongoose");
const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

var things = require("./methods.js");
app.use("/methods", things);

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

//sign in process
app.post("/signin", async (req, res) => {
  // const loginUser = req.body;
  const {email, password} = req.body;
  console.log(loginUser);

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).send({message: "User not found."});
    }
    if (user.password !== password) {
      return res.status(401).send({message: "Incorrect password."});
    }
    res.send({message: "User logged in successfully."});
  } catch (err) {
    console.error("Error during sign-in: ", err);
    res.status(500).send("Error during sign-in");
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

//update registered memebers
app.put("/member-registration/:id", async (req, res) => {
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
app.delete("/member-registration/:id", async (req, res) => {
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
app.get("/member-registration", async (req, res) => {
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
