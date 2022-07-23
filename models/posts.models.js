const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    email: String,
    title: String,
    body: String
})


const postModel = mongoose.model("usersPosts", postSchema);

module.exports = {postModel};