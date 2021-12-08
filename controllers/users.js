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

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const signupUser = async (req, res, next) => {
  Users.register(
    new Users({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      try {
        if (err) {
          throw new Error("Cannot register new user");
        } else {
          user.save((err) => {
            if (err) {
              throw new Error("Cannot register new user");
            } else {
              passport.authenticate("local")(req, res, () => {
                res.status(200).json({ success: true });
              });
            }
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );
};

export const loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    try {
      if (!user || err) {
        throw new Error("Cannot Login");
      }
      req.login(user, (err) => {
        if (err) {
          next(err);
        }
        const token = getToken({ _id: req.user._id });
        res.status(200).json({
          message: "Logged in",
          token: token,
          success: true,
          userId: req.user._id,
          username: req.user.username,
          admin: req.user.admin,
        });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
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
