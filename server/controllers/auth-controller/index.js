const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return passwordRegex.test(password);
};

// const registerUser = async (req, res) => {
//   const { userName, userEmail, password, role } = req.body;

//   const existingUser = await User.findOne({
//     $or: [{ userEmail }, { userName }],
//   });

//   if (existingUser) {
//     return res.status(400).json({
//       success: false,
//       message: "User name or user email already exists",
//     });
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({
//     userName,
//     userEmail,
//     role,
//     password: hashPassword,
//   });

//   await newUser.save();
  
//   // Generate access token for new user
//   const accessToken = jwt.sign(
//     {
//       _id: newUser._id,
//       userName: newUser.userName,
//       userEmail: newUser.userEmail,
//       role: newUser.role,
//     },
//     "JWT_SECRET",
//     { expiresIn: "120m" }
//   );

//   return res.status(201).json({
//     success: true,
//     message: "User registered successfully!",
//     data: {
//       accessToken,
//       user: {
//         _id: newUser._id,
//         userName: newUser.userName,
//         userEmail: newUser.userEmail,
//         role: newUser.role,
//       },
//     },
//   });
// };

// naya
const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const errors = [];

  if (!userName || !userEmail || !password || !role) {
    errors.push("All fields are required");
  }

  if (!isValidEmail(userEmail)) {
    errors.push("Invalid email format");
  }

  if (!isStrongPassword(password)) {
    errors.push(
      "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(", "),
    });
  }

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  const accessToken = jwt.sign(
    {
      _id: newUser._id,
      userName: newUser.userName,
      userEmail: newUser.userEmail,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "120m" }
  );

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
    data: {
      accessToken,
      user: {
        _id: newUser._id,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
        role: newUser.role,
      },
    },
  });
};


// const loginUser = async (req, res) => {
//   const { userEmail, password } = req.body;

//   const checkUser = await User.findOne({ userEmail });

//   if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid credentials",
//     });
//   }

//   const accessToken = jwt.sign(
//     {
//       _id: checkUser._id,
//       userName: checkUser.userName,
//       userEmail: checkUser.userEmail,
//       role: checkUser.role,
//     },
//     "JWT_SECRET",
//     { expiresIn: "120m" }
//   );

//   res.status(200).json({
//     success: true,
//     message: "Logged in successfully",
//     data: {
//       accessToken,
//       user: {
//         _id: checkUser._id,
//         userName: checkUser.userName,
//         userEmail: checkUser.userEmail,
//         role: checkUser.role,
//       },
//     },
//   });
// };
// naya

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  if (!userEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  if (!isValidEmail(userEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  const checkUser = await User.findOne({ userEmail });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};

module.exports = { registerUser, loginUser };
