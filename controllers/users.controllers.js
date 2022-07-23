const {UserComplaintModel,UserSignupModel} = require("../models/users.models");
const attorneyModel = require("../models/attorneys.models");

const bcryptjs= require('bcryptjs')
const jwt = require('jsonwebtoken');
const { response } = require("express");
const complaint = (req, res) => {
    const complaint = req.body;
    const form = new UserComplaintModel(complaint);
    form.save((err) => {
        if (err) internalServerError(res);
        else {
            res.send({status: true, message: "Complaint sent successfully"});
        }
    })
}
const register = (req, res) => {
    const userLog = req.body;
    UserSignupModel.findOne({email: userLog.email}, (err, resp) => {
        if(err) {
            internalServerError(res);
        } else {
            if(resp) {
                res.send({status: false, message: "Email already exist"});
            } else {
        attorneyModel.findOne({email:userLog.email}, (err, resp) => {
        if(err){
            res.send(err.message)
        }
        else if(resp){
            res.send("Email exists")
        }
        else{
            const myPlaintextPassword = userLog.password
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(myPlaintextPassword, salt);
            const newForm={
                first_name:userLog.first_name,
                last_name:userLog.last_name,
                email:userLog.email,                
                password:hash,
                phoneNumber:userLog.phoneNumber
            }
            console.log(newForm)
            const form = new UserSignupModel(newForm);
            form.save((err) => {
                res.send({status: true, message: "Registration successful"});
            })
        }
    })

            }
        }
    })
}
const login = (req, res) => {
    const userLog = req.body;
    const emaill=userLog.email
    console.log(userLog)
        UserSignupModel.findOne({email: userLog.email}, (err,result) => {
        console.log(result);
        if (err) internalServerError(res);
        if (!result) {
                console.log("Email does not exist")
                res.send({status: false, message: `Email does not exist`});

        }
        else {
            const receivedPassword=result.password;
            const myPlaintextPassword =userLog.password;
            bcryptjs.hash(myPlaintextPassword,10).then((hash) => {
                return bcryptjs.compare(myPlaintextPassword, receivedPassword)
            }).then((result) => {
                if(result==true){
                    jwt.sign({emaill},  process.env.JWT_SECRET, function(err, token) {
                        console.log(token);
                        console.log("Successful login")
                        res.send({message:"Your login is successful!",token})
                    })
                    }
                    else {
                        res.send({status: false, message: `Invalid email or password`});
                        console.log("Wrong password")
                    }
                    });
        }
    })
}
module.exports = { complaint,register,login }