const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// Get user profile
// In userController.js
exports.getProfile = async (req, res) => {
  try {
    console.log("User from token:", req.user); // Add this for debugging
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Update profile (name/email)
exports.updateProfile = async (req, res) => {
  const { userName, userEmail } = req.body;
  
  // Basic validation
  if (userEmail && !isValidEmail(userEmail)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  
  try {
    // Check if email exists (if trying to update email)
    if (userEmail) {
      const emailExists = await User.findOne({ 
        userEmail, 
        _id: { $ne: req.user._id } 
      });
      
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Only update fields that were provided
    if (userName) user.userName = userName;
    if (userEmail) user.userEmail = userEmail;
    
    await user.save();
    
    res.json({ 
      message: "Profile updated successfully", 
      user: {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  // Password validation
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ 
      message: "Password must be at least 8 characters long" 
    });
  }
  
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });
    
    // Hash new password with higher salt rounds for better security
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}