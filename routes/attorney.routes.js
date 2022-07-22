const { register,login } = require("../controllers/attorneys.controllers");

const route = require("express").Router();

route.post("/register", register);
route.post("/login", login);


module.exports = route;