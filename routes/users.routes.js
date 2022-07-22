const { complaint,login } = require("../controllers/users.controllers");

const router = require("express").Router();

router.post("/complaint", complaint);
router.post("/login", login);


module.exports = router;