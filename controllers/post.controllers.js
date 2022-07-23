const jwt = require('jsonwebtoken')
const attorneyModel = require("../models/attorneys.models");
const { postModel } = require("../models/posts.models");

const post =(request, response)=>{
        console.log(request.body)
        newPost={
            email:request.body.email,
            title:request.body.title,
            body:request.body.body
        }
        const form = new postModel(newPost);
        form.save((err) => {
            if (err) {
                response.send(err.message)

                console.log(err.message)
            }
            else{
                response.send({status: true, message: "Post received"});
                console.log("Posted")
            }
        })
    }
module.exports = { post }
