const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    complaint: String,
})

const UserModel = mongoose.model("users_tbs", userSchema);

module.exports = UserModel;