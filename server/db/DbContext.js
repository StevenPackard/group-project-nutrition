import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import PostSchema from "../models/Post";
import ProfileSchema from "../models/Profile";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Posts = mongoose.model("Post", PostSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();
