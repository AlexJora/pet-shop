import jwt from "jsonwebtoken";
// Define a function named generateToken that takes two parameters: res (HTTP response object) and userId (user identifier).
const generateToken = (res, userId) => {
  //var token = jwt.sign(payload, privateKey, signOptions);
  // Create a JWT token using the jwt.sign method.
  // The payload of the JWT includes the userId.
  // The process.env.JWT_SECRET is used as the secret key for signing the JWT.
  // It also sets an expiration time of 30 days for the token.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // Set the JWT as an HTTP-only cookie in the response object (res).
  //jwt=cookie/token=the value that will be stored inside the "jwt" cookie
  res.cookie("jwt", token, {
    // Make the cookie HTTP-only, so it cannot be accessed or modified by JavaScript running in the browser.
    httpOnly: true,
    // In a production environment (when NODE_ENV is not "development"),
    // set the 'secure' flag to TRUE to ensure the cookie is only sent over HTTPS connections.
    secure: process.env.NODE_ENV !== "development",
    // Set the 'sameSite' attribute to "strict" to protect against cross-site request forgery (CSRF) attacks.
    sameSite: "strict",
    // Set the cookie's maximum age to 30 days in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
};
export default generateToken;
