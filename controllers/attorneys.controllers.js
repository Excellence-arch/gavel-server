const attorneyModel = require("../models/attorneys.models");

const internalServerError = (res) => {
    res.status(501).send({status: false, message: "Internal server error"});
}

const register = (req, res) => {
    const attorney = req.body;
    attorneyModel.findOne({email: attorney.email}, (err, resp) => {
        if(err) {
            internalServerError(res);
        } else {
            if(resp) {
                res.send({status: false, message: "Email already exist"});
            } else {
                form.save((err) => {
                    res.send({status: true, message: "Registration successful"});
                })
            }
        }
    })
    const form = new attorneyModel(attorney);
}

const login = (req, res) => {
    const attorney = req.body;
    attorneyModel.findOne({email: attorney.email}, (err, result) => {
        if (err) internalServerError(res);
        else {
            if(result && result.password == attorney.password) {
                res.send({status: true, message: `Login successful`});
            } else {
                res.send({status: false, message: `Invalid email or password`});
            }
        }
    })
}

module.exports = { register, internalServerError, login };