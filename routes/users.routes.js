const { complaint,register,login } = require("../controllers/users.controllers");

const router = require("express").Router();

router.post("/complaint", complaint);

router.post("/register", register);

router.post("/login", login);




module.exports = router;