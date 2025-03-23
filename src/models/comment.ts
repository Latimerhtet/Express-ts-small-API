import mongoose, { Schema } from "mongoose";
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shopPost: {
      type: Schema.Types.ObjectId,
      ref: "ShopPost",
    },
    reactions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
