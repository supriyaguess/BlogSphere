const { createHmac, randomBytes } = require("crypto");
const { Schema, model} = require("mongoose");


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        
    },
    password:  {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/images/default.js",
    },
    role: {
        type: String,
        enum: ["USER" , "ADMIN"],
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


const User = model("user", userSchema);

module.exports = User;