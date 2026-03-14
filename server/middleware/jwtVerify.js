import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";
import { issueTokens } from "./issueTokens.js";

export default async function verifyToken(req, res, next) {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    console.log("no token");
    return res.status(401).json({ error: "authentication required" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, payload) => {
      if (err && err.name === "TokenExpiredError") {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken)
          return res.status(401).json({ error: "authentication required" });

        const session = await prisma.session.findUnique({
          where: { refreshToken },
          include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
          return res
            .status(401)
            .json({ error: "session expired, please log in again" });
        }

        await prisma.session.delete({
          where: { refreshToken },
        });

        await issueTokens(res, session.user);
        req.user = { id: session.user.id, username: session.user.username };
        return next();
      }

      if (err) {
        return res.status(403).json({ error: "invalid token" });
      }

      req.user = payload;
      next();
    }
  );
}
