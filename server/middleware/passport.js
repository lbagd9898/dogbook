import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../prismaClient.js";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      try {
        const user = await prisma.usersfindUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          return done(false, null, { message: "Invalid email." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "incorrect password." });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  )
);

export default passport;
