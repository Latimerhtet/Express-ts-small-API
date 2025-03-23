import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    cover_photo: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    shopPosts: [{ type: Schema.Types.ObjectId, ref: "ShopPost" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordMatch = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessJWTtoken = async function () {
  jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY as string,
    {
      expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRED_DATE),
    }
  );
};

userSchema.methods.generateRefreshJWTtoken = async function () {
  jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    {
      expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRED_DATE),
    }
  );
};

export const User = mongoose.model("User", userSchema);
