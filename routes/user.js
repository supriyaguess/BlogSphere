const { Router } = require("express");
const User = require("../models/user");

const router = Router();

/* ===================== SIGNUP PAGE ===================== */
router.get("/signup", (req, res) => {
  return res.render("signup", { error: null });
});

/* ===================== SIGNIN PAGE ===================== */
router.get("/signin", (req, res) => {
  return res.render("signin", { error: null });
});

/* ===================== SIGNUP LOGIC ===================== */
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.render("signup", { error: "All fields are required" });
    }

    const user = new User({
      fullName,
      email: email.trim().toLowerCase(),
      password,
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


/* ===================== LOGOUT LOGIC ===================== */
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
