import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "token invalid or expired" });
    }

    req.user = payload;
    next();
  });
}
