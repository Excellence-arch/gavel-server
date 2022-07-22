const UserModel = require("../models/users.models");
const { internalServerError } = require("./attorneys.controllers");
const bcryptjs= require('bcryptjs')
const jwt = require('jsonwebtoken')
const complaint = (req, res) => {
    const complaint = req.body;
    const form = new UserModel(complaint);
    form.save((err) => {
        if (err) internalServerError(res);
        else {
            res.send({status: true, message: "Complaint sent successfully"});
        }
    })
}

module.exports = { complaint }