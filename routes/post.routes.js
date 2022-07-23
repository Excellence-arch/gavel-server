const { post } = require("../controllers/post.controllers");

const router = require("express").Router();
router.post('/', post)


module.exports = router;