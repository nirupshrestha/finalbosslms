const express = require("express");
const {
  getStudentViewCourseDetails,
  getAllStudentViewCourses,
  checkCoursePurchaseInfo,
  rateCourse
} = require("../../controllers/student-controller/course-controller");
const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/details/:id", getStudentViewCourseDetails);
router.get("/check-purchase/:id/:studentId", checkCoursePurchaseInfo);
router.post("/:courseId/rate", rateCourse);

module.exports = router;
