import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const User = mongoose.Schema(
  {
    username: { default: "", type: String },
  },
  { timestamp: true }
);

User.plugin(passportLocalMongoose);

const Users = mongoose.model("Users", User);

export default Users;
