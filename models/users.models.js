const mongoose = require("mongoose");

const userComplaintSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    complaint: String,
})
const userSignupSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phoneNumber: String,
    picture: String
})

const UserComplaintModel = mongoose.model("usersComplaints", userComplaintSchema);
const UserSignupModel = mongoose.model("userDetails", userSignupSchema);

module.exports = {UserComplaintModel,UserSignupModel};