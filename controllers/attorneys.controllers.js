const attorneyModel = require("../models/attorneys.models");
const {UserSignupModel} = require("../models/users.models");

const bcryptjs= require('bcryptjs')
const jwt = require('jsonwebtoken')
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
    UserSignupModel.findOne({email: attorney.email}, (err, resp) => {

        if(resp) {
            res.send({status: false, message: "Email already exist"});
        } 
        else if(err){
            res.send(err.message)
        }
        else{
            const myPlaintextPassword = attorney.password
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(myPlaintextPassword, salt);
            // console.log(hash)
            const newForm={
                first_name:attorney.first_name,
                last_name:attorney.last_name,
                email:attorney.email,                
                password:hash,
                phoneNumber:attorney.phoneNumber
            }
            console.log(newForm)
            const form = new attorneyModel(newForm);
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
    const attorney = req.body;
    const emaill=attorney.email
    console.log(attorney)
        attorneyModel.findOne({email: attorney.email}, (err,result) => {
        console.log(result);
        if (err) internalServerError(res);
        if (!result) {
                console.log("Email does not exist")
                res.send({status: false, message: `Email does not exist`});

        }
        else {
            const receivedPassword=result.password;
            const myPlaintextPassword = attorney.password;

            bcryptjs.hash(myPlaintextPassword, 10).then((hash) => {
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

module.exports = { register, internalServerError, login };