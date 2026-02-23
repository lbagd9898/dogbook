import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  console.log("verify token function reached");
  console.log(token);
  if (!token) {
    console.log("no token");
    return res.status(401).json({ error: "authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "token invalid or expired" });
    }
    // console.log("token verified");
    req.user = payload;
    next();
  });
}
