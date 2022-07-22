const { register } = require("../controllers/attorneys.controllers");

const route = require("express").Router();

route.post("/register", register);

module.exports = route;