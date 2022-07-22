const { complaint } = require("../controllers/users.controllers");

const router = require("express").Router();

router.post("/complaint", complaint);

module.exports = router;