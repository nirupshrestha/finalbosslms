// import { Route, Routes } from "react-router-dom";
// import AuthPage from "./pages/auth";
// import RouteGuard from "./components/route-guard";
// import { useContext } from "react";
// import { AuthContext } from "./context/auth-context";
// import InstructorDashboardpage from "./pages/instructor";
// import StudentViewCommonLayout from "./components/student-view/common-layout";
// import StudentHomePage from "./pages/student/home";
// import NotFoundPage from "./pages/not-found";
// import AddNewCoursePage from "./pages/instructor/add-new-course";
// import StudentViewCoursesPage from "./pages/student/courses";
// import StudentViewCourseDetailsPage from "./pages/student/course-details";
// import PaypalPaymentReturnPage from "./pages/student/payment-return";
// import StudentCoursesPage from "./pages/student/student-courses";
// import StudentViewCourseProgressPage from "./pages/student/course-progress";
// import { Toaster } from "@/components/ui/toaster"
// import { useToast } from "@/hooks/use-toast"
// import ContactPage from "./pages/contact";
// import AboutUs from  "./pages/aboutus";
// import FAQPage from "./pages/faq";
// import SupportPage from "./pages/support";
// import BlogPage from "./pages/blog";
// import ProfilePage from "./pages/student/profile-page/ProfilePage";


// function App() {
//   const { auth } = useContext(AuthContext);
//   const { toast } = useToast();

//   return (
//     <>
//       <Routes>
//         <Route
//           path="/auth"
//           element={
//             <RouteGuard
//               element={<AuthPage />}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         />
//         <Route
//           path="/instructor"
//           element={
//             <RouteGuard
//               element={<InstructorDashboardpage />}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         />
//         <Route
//           path="/instructor/create-new-course"
//           element={
//             <RouteGuard
//               element={<AddNewCoursePage />}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         />
//         <Route
//           path="/instructor/edit-course/:courseId"
//           element={
//             <RouteGuard
//               element={<AddNewCoursePage />}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         />

//         <Route
//           path="/edit-profile"
//           element={
//             <RouteGuard
//               element={<ProfilePage/>}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         />
        
//         {/* Public routes for homepage and general browsing */}
//         <Route path="/" element={<StudentViewCommonLayout />}>
//           <Route path="" element={<StudentHomePage />} />
//           <Route path="home" element={<StudentHomePage />} />
//           <Route path="courses" element={<StudentViewCoursesPage />} />
//           <Route path="contact" element={<ContactPage/>} />
//           <Route path="aboutus" element={<AboutUs/>} />
//           <Route path="support" element={<SupportPage/>} />
//           <Route path="blog" element={<BlogPage/>} />
//           <Route path="faq" element={<FAQPage/>} />
//            <Route
//           path="/edit-profile"
//           element={
//             <RouteGuard
//               element={<ProfilePage/>}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         />

//           <Route
//             path="course/details/:id"
//             element={<StudentViewCourseDetailsPage />}
//           />
//         </Route>

//         {/* Payment return route - must be outside student routes */}
//         <Route path="/payment-return" element={<PaypalPaymentReturnPage />} />

//         {/* Protected student routes that require authentication */}
//         <Route
//           path="/student"
//           element={
//             <RouteGuard
//               element={<StudentViewCommonLayout />}
//               authenticated={auth?.authenticate}
//               user={auth?.user}
//             />
//           }
//         >
//           <Route path="courses" element={<StudentCoursesPage />} />
//           <Route
//             path="course-progress/:id"
//             element={<StudentViewCourseProgressPage />}
//           />
//         </Route>
        
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//       <Toaster />
//     </>
//   );
// }

// export default App;

import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import ContactPage from "./pages/contact";
import AboutUs from  "./pages/aboutus";
import FAQPage from "./pages/faq";
import SupportPage from "./pages/support";
import BlogPage from "./pages/blog";
import ProfilePage from "./pages/student/profile-page/ProfilePage";
import VerifyEmailPage from "./pages/verifyemail";


function App() {
  const { auth } = useContext(AuthContext);
  const { toast } = useToast();

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard
              element={<AuthPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor"
          element={
            <RouteGuard
              element={<InstructorDashboardpage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor/create-new-course"
          element={
            <RouteGuard
              element={<AddNewCoursePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <RouteGuard
              element={<AddNewCoursePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        
        {/* Public routes for homepage and general browsing */}
        <Route path="/" element={<StudentViewCommonLayout />}>
          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<StudentViewCoursesPage />} />
          <Route path="contact" element={<ContactPage/>} />
          <Route path="aboutus" element={<AboutUs/>} />
          <Route path="support" element={<SupportPage/>} />
          <Route path="blog" element={<BlogPage/>} />
          <Route path="faq" element={<FAQPage/>} />
          <Route path="verify/:token" element={<VerifyEmailPage/>} />
          <Route
            path="edit-profile"
            element={
              <RouteGuard
                element={<ProfilePage/>}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />
          <Route
            path="course/details/:id"
            element={<StudentViewCourseDetailsPage />}
          />
        </Route>

        {/* Payment return route - must be outside student routes */}
        <Route path="/payment-return" element={<PaypalPaymentReturnPage />} />

        {/* Protected student routes that require authentication */}
        <Route
          path="/student"
          element={
            <RouteGuard
              element={<StudentViewCommonLayout />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        >
          <Route path="courses" element={<StudentCoursesPage />} />
          <Route
            path="course-progress/:id"
            element={<StudentViewCourseProgressPage />}
          />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;