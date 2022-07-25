const { post, getAll } = require("../controllers/post.controllers");

const router = require("express").Router();
router.post('/', post)
router.get('/all', getAll)



module.exports = router;