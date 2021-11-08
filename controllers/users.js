import passport from "passport";
import { getToken } from "../authenticate.js";
import Users from "../models/user.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const signupUser = async (req, res, next) => {
  try {
    await Users.register(
      new Users({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.json({ error: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.json({ status: 200, success: true });
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (!user || err) {
        res.json({ success: false, err: err, info: info });
      }
      req.login(user, (err) => {
        if (err) {
          res.json({ success: false, err: err, info: info });
        }
      });
      const token = getToken({ _id: req.user._id });
      res.json({ token: token, success: true, statusCode: 200 });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
};
