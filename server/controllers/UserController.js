const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const { GenerateToken, ValidateToken } = require("../utils/GenerateToken");
async function SignUpHandler(req, res) {
  /**
   * hash the password before storing it in the database
   * the datbase do not store the password in plain text
   */
  const { email, password, firstName, lastName } = req.body;
  const hasedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email: email,
      password: hasedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    user.password = undefined;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function LoginHandler(req, res) {
  /**
   * check if the user exists in the database
   * if the user exists, compare the password with the hashed password
   * if the password is correct, generate a token and send it to the client
   */
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = GenerateToken(user);
      console.log(token);
      res.status(200).json({
        token: token,
        user_id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const AuthenticatedHandler = (req, res) => {
  /**
   * This function let user to verify if the token is valid without sending the password
   */
  const token = req.headers.authorization.split(" ")[1];
  const { email, userId } = ValidateToken(token);
  const user = User.findOne({ email: email, _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).json({ message: "Authenticated" });
  }
};

module.exports = {
  SignUpHandler,
  LoginHandler,
  AuthenticatedHandler,
};
