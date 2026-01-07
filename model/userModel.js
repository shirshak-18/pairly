const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: String,
    name: String,
    bio: String,
    gender: String,
    photo: {
      data: Buffer,
      contentType: String,
    },
    hasphoto: {
      type: Boolean,
      default: false,
    },
    crushcount: {
      type: Number,
      default: 0,
    },
    crushlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dms: {
      type: [String],
      default: [
        "Hello from the Pairly team 👋",
        "Hey there! Thought I’d say hi 😊",
      ],
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};
module.exports.User = model("User", userSchema);
