const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HASH_ROUNDS, JWT_SECRET_KEY } = require("../constants");
const { validateLoginSchema, validateSignUpSchema } = require("../utils");
const { create, get } = require("../services/user.service");

async function signUp(req, res) {
  const { error } = validateSignUpSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
    create({ name, email, password: hashedPassword });
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { error } = validateLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const user = await get(email);
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).send({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = { signUp, login };
