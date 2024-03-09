const { login, signUp } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", signUp);
router.post("/login", login);

module.exports = router;
