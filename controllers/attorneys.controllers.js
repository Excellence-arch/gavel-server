const attorneyModel = require("../models/attorneys.models");
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
                const myPlaintextPassword = attorney.password
                const salt = bcryptjs.genSaltSync(10);
                const hash = bcryptjs.hashSync(myPlaintextPassword, salt);
                // console.log(hash)
                const newForm={
                    first_name:attorney.first_name,
                    last_name:attorney.last_name,
                    email:attorney.email,                
                    password:hash
                }
                console.log(newForm)
                const form = new attorneyModel(newForm);
                form.save((err) => {
                    res.send({status: true, message: "Registration successful"});
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
                console.log("No user found")
                res.send({status: false, message: `No user found`});

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
                        res.send({message:"Your login is successful!",result,token})
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