const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../../controllers/student-controller/userController");
const authenticate = require("../../middleware/auth-middleware");

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);

module.exports = router;
