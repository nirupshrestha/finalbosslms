const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

// const getAllStudentViewCourses = async (req, res) => {
//   try {
//     const {
//       category = [],
//       level = [],
//       primaryLanguage = [],
//       sortBy = "price-lowtohigh",
//     } = req.query;

//     console.log(req.query, "req.query");

//     let filters = {};
//     if (category.length) {
//       filters.category = { $in: category.split(",") };
//     }
//     if (level.length) {
//       filters.level = { $in: level.split(",") };
//     }
//     if (primaryLanguage.length) {
//       filters.primaryLanguage = { $in: primaryLanguage.split(",") };
//     }

//     let sortParam = {};
//     switch (sortBy) {
//       case "price-lowtohigh":
//         sortParam.pricing = 1;

//         break;
//       case "price-hightolow":
//         sortParam.pricing = -1;

//         break;
//       case "title-atoz":
//         sortParam.title = 1;

//         break;
//       case "title-ztoa":
//         sortParam.title = -1;

//         break;

//       default:
//         sortParam.pricing = 1;
//         break;
//     }

//     const coursesList = await Course.find(filters).sort(sortParam);

//     res.status(200).json({
//       success: true,
//       data: coursesList,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// ------------------------------------------------------------
// 1. Backend Fix - Update your controller (student.controller.js)
// ------------------------------------------------------------

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
      search = "", // Add search parameter handling
    } = req.query;
    
    //console.log(req.query, "req.query");
    
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }
    
    // Add search filter if search parameter exists
    if (search && search.trim() !== "") {
      // Search in title and description for more comprehensive results
      filters.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        // { description: { $regex: new RegExp(search, "i") } }
      ];
    }
    
    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }
    
    const coursesList = await Course.find(filters).sort(sortParam);
    
    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};


const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses ? studentCourses.courses.findIndex((item) => item.courseId === id) > -1 : false;
    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const rateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId, rating } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    // Check if user has already rated
    const existingRatingIndex = course.ratings.findIndex(r => r.userId === userId);
    
    if (existingRatingIndex > -1) {
      // Update existing rating
      course.ratings[existingRatingIndex].rating = rating;
      course.ratings[existingRatingIndex].date = new Date();
    } else {
      // Add new rating
      course.ratings.push({ userId, rating });
    }

    // Calculate new average rating
    const totalRatings = course.ratings.length;
    const sumRatings = course.ratings.reduce((sum, r) => sum + r.rating, 0);
    course.averageRating = sumRatings / totalRatings;
    course.totalRatings = totalRatings;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully",
      data: {
        averageRating: course.averageRating,
        totalRatings: course.totalRatings
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!"
    });
  }
};

module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
  rateCourse
};