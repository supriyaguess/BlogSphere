const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const JWT = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    salt: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const userHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password !== userHash) {
    throw new Error("Invalid email or password");
  }

  const token = createTokenForUser(user);
  return token;
};

const User = model("User", userSchema);
module.exports = User;
