import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { prisma } from "../prismaClient.js";
import bcrypt from "bcryptjs";

//local strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          return done(null, false, { message: "Invalid email." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "incorrect password." });
        }

        return done(null, user);
      } catch (e) {
        console.log("error");
        console.log(e);
        return done(e);
      }
    }
  )
);

//github strategy
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            githubId: profile.id,
          },
        });
        if (!user) {
          return done(null, false, {
            githubProfile: profile,
          });
        }
        return done(null, user);
      } catch (e) {
        console.log(e);
        return done(e);
      }
    }
  )
);

export default passport;
