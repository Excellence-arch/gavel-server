const { authenticate } = require("../controllers/dashboard.controllers");

const router = require("express").Router();
router.get('/', authenticate)


module.exports = router;
