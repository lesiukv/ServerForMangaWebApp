import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const User = mongoose.Schema(
  {
    username: { default: "", type: String },
    admin: { default: false, type: Boolean },
  },
  { timestamp: true }
);

User.plugin(passportLocalMongoose);

const Users = mongoose.model("Users", User);

export default Users;
