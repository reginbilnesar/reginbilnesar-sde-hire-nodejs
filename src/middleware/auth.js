const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);

    const user = await user.findOne({ _id: verifyUser._id });
    console.log(user.firstname);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send(Error);
  }
};

/* // Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
 */
module.exports = auth;
