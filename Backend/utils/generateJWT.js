import jwt from "jsonwebtoken";

export const generateJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // XSS - Cross-site Scripting
    sameSite: "strict", // CSRF - Cross-site Request Forgery
    secure: process.env.NODE_ENV !== "development", // HTTPS
  });

  return token;
};

export default generateJWT;
