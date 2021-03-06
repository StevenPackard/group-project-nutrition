import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    date: { type: String, required: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Post.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Post;
