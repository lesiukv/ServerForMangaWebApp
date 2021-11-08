import passport from "passport";
import { Strategy } from "passport-local";
import User from "./models/user.js";
import pkg from "passport-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const LocalStrategy = Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = pkg;

export const local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export const getToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 86400 });
};

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_KEY;

passport.use(
  "user-rule",
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.use(
  "admin-rule",
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user.admin) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export const verifyUser = passport.authenticate("user-rule", {
  session: false,
});
export const verifyAdmin = passport.authenticate("admin-rule", {
  session: false,
});
