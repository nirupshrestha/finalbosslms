import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function getProfileService() {
  try {
    // Fix 1: Match the route path with what's defined in your router
    const { data } = await axiosInstance.get("/student/user-profile/profile");
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function updateProfileService(profileData) {
  try {
    // Fix 2: Match the route path with what's defined in your router
    const { data } = await axiosInstance.put("/student/user-profile/profile", profileData);
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function changePasswordService(passwordData) {
  try {
    // Fix 3: Match the route path with what's defined in your router
    const { data } = await axiosInstance.put("/student/user-profile/change-password", passwordData);
    return data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

// // Fix 2: Update fetchStudentViewCourseListService in services/index.js
// export async function fetchStudentViewCourseListService(queryString) {
//   // Add defensive check to handle both string and URLSearchParams object
//   const query = typeof queryString === 'object'
//     ? queryString.toString()
//     : queryString;

//   console.log(`API Call: /student/course/get?${query}`);
//   const { data } = await axiosInstance.get(`/student/course/get?${query}`);
//   return data;
// }

// Update this in your services/index.js
export async function fetchStudentViewCourseListService(queryString) {
  // Add defensive check to handle both string and URLSearchParams object
  const query = typeof queryString === 'object'
    ? queryString.toString()
    : queryString;

  console.log(`API Call: /student/course/get?${query}`);
  try {
    const { data } = await axiosInstance.get(`/student/course/get?${query}`);
    return data;
  } catch (error) {
    console.error("API error:", error);
    return { success: false, message: error.message, data: [] };
  }
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(
    `/student/course/details/${courseId}`
  );

  return data;
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(
    `/student/course/check-purchase/${courseId}/${studentId}`
  );
  return data;
}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}

// export const submitCourseRatingService = async (courseId, ratingData) => {
//   const { data } = await axiosInstance.post(
//     `/student/course/${courseId}/rate`,
//     ratingData
//   );
//   return data;
// };

export const getCourseReviewsService = async (courseId) => {
  const { data } = await axiosInstance.get(
    `/student/course/${courseId}/reviews`
  );
  return data;
};

export async function deleteCourseService(courseId) {
  const { data } = await axiosInstance.delete(`/instructor/course/delete/${courseId}`);
  return data;
}

export async function submitCourseRatingService(userId, courseId, rating) {
  const { data } = await axiosInstance.post(
    `/student/courses/${courseId}/rate`,
    {
      userId,
      rating
    }
  );
  return data;
}