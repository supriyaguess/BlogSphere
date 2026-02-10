const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* ===================== SIGNUP PAGE ===================== */
router.get("/signup", (req, res) => {
  return res.render("signup", { error: null });
});

/* ===================== SIGNIN PAGE ===================== */
router.get("/signin", (req, res) => {
  return res.render("signin", { error: null });
});

/* ===================== SIGNUP LOGIC ===================== */
router.post("/signup", upload.single("profileImage"), async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.render("signup", { error: "All fields are required" });
    }

    const user = new User({
      fullName,
      email: email.trim().toLowerCase(),
      password,
      profileImageURL: req.file ? `/uploads/${req.file.filename}` : "/images/default.png",
    });

    await user.save();

    return res.redirect("/user/signin");
  } catch (error) {
    console.error("Signup error:", error);
    return res.render("signup", { error: error.message });
  }
});

/* ===================== SIGNIN LOGIC ===================== */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("signin", {
        error: "Email and password are required",
      });
    }

    const token = await User.matchPasswordAndGenerateToken(email, password);
    
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    return res.render("signin", { error: error.message });
  }
});


/* ===================== PROFILE PAGE ===================== */
router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  return res.render("profile", { user: req.user, error: null, success: null });
});

/* ===================== UPDATE PROFILE PHOTO ===================== */
router.post("/profile", upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("/user/signin");
    }

    if (!req.file) {
      return res.render("profile", { user: req.user, error: "Please select an image", success: null });
    }

    await User.findByIdAndUpdate(req.user._id, {
      profileImageURL: `/uploads/${req.file.filename}`,
    });

    return res.render("profile", { 
      user: { ...req.user, profileImageURL: `/uploads/${req.file.filename}` }, 
      error: null, 
      success: "Profile photo updated successfully!" 
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.render("profile", { user: req.user, error: error.message, success: null });
  }
});

/* ===================== LOGOUT LOGIC ===================== */
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
