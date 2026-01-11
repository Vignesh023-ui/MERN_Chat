import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  // ? Get token from cookie
  const token = req.cookies.jwt;

  try {
    // ? decode token to get user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // ! add user to request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

export default verifyJWT;
