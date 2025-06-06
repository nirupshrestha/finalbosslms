import { courseCategories } from "@/config";
import banner from "../../../assets/banner1-img.jpg";
import banner1 from "../../../assets/banner2-img.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "@/components/ui/SliderArrows";

const banners = [
  {
    img: banner,
    title: "Learning that gets you",
    description: "Skills for your present and your future. Get started with us.",
  },
  {
    img: banner1,
    title: "Unlock your potential",
    description: "Join thousands of learners reaching new heights with Revoc Learning.",
  },
];

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuthenticated = auth?.authenticate;

  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    // Always navigate to course details page for both authenticated and unauthenticated users
    navigate(`/course/details/${getCurrentCourseId}`);
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white m-0 p-0">
      {/* <section className="relative w-full h-[450px] overflow-hidden p-0 m-0">
        <img
          src={banner}
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Learning banner"
        />
        <div className="relative z-10 h-full flex items-center justify-start px-8">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md">
            <h1 className="text-4xl font-bold mb-2">Learning that gets you</h1>
            <p className="text-lg">
              Skills for your present and your future. Get started with us.
            </p>
          </div>
        </div>
      </section> */}
      <section className="relative w-full h-[450px] overflow-hidden p-0 m-0">
      

        <Slider
          autoplay
          autoplaySpeed={3000}
          infinite
          arrows={true}
          dots={true}
          fade
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {banners.map((bannerItem, index) => (
            <div key={index} className="relative">
              <img
                src={bannerItem.img}
                className="w-full h-[450px] object-cover"
                alt={`Banner ${index + 1}`}
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start px-8 ">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-2xl max-w-md ml-8">
                  <h1 className="text-4xl font-bold mb-2">{bannerItem.title}</h1>
                  <p className="text-lg">{bannerItem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

      </section>


      <section className="py-10 px-4 lg:px-12 bg-white text-left">
        <h2 className="text-3xl font-bold mb-2">
          Ready to reimagine your career?
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-3">
          Get the skills and real-world experience employers want with <strong>Revoc Learning</strong>.
        </p>
      </section>





      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                  alt={courseItem?.title}
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
