const jwt = require('jsonwebtoken')
const attorneyModel = require("../models/attorneys.models");
const {UserSignupModel} = require("../models/users.models");

const authenticate=(request, response)=>{
    const auth= request.headers.authorization
    const token = auth.split(' ')[1]
    console.log(token)
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log(`jwt could not be decoded`)
            response.send({message:err.message})
        }  
        else{
            console.log(decoded)
            const email =decoded.emaill;
        UserSignupModel.findOne({email:email}, (err,result) => {
            if(result){
                const userDetails=result;
                console.log({userDetails,userType:"regUser"})
                    response.send({userDetails,userType:"regUser"})
            }
            else{
            attorneyModel.findOne({email:email}, (err,result) => {
            if (result) {
                const userDetails=result;
                console.log({userDetails,userType:"Lawyer"})
                    response.send({userDetails,userType:"Lawyer"})
            }
            else{
                response.send("No user found")
            }
        })
            }
        })
        }
    })
}
module.exports = { authenticate }
