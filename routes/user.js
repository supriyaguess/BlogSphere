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

    await User.create({
      fullName,
      email: email.trim().toLowerCase(), // IMPORTANT
      password,
    });

    return res.redirect("/user/signin");
  } catch (error) {
    return res.render("signup", { error: error.message });
  }
});

/* ===================== SIGNIN LOGIC ===================== */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.matchPassword(
      email.trim().toLowerCase(), // IMPORTANT
      password
    );

    console.log("Logged in user:", user.email);

    // TODO: set session / cookie here later
    return res.redirect("/");
  } catch (error) {
    return res.render("signin", { error: error.message });
  }
});

module.exports = router;
