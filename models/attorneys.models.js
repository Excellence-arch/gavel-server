const mongoose = require("mongoose");

attorneySchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phoneNumber: String,
    picture: String
})

attorneyModel = mongoose.model("attorney_tbs", attorneySchema);

module.exports = attorneyModel;