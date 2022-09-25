const jwt = require("jsonwebtoken");

exports.checkAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Please log in first" });
  }
};

exports.checkAuthorisation = (req, res, next) => {
  const user = res.locals.loggedInUser;

  const userRole = user.role;
  if (userRole.includes("admin")) {
    next();
  } else {
    res.status(403).json({
      message: "You don't have enough permission to perform this action",
    });
  }
};
