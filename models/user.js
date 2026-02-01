const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

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
      lowercase: true, // IMPORTANT
      trim: true,      // IMPORTANT
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

/* ===================== HASH PASSWORD ===================== */
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

/* ===================== MATCH PASSWORD ===================== */
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({
    email: email.trim().toLowerCase(), // FIX
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

  return user;
});

const User = model("User", userSchema);
module.exports = User;
