import CourseRating from "@/components/student-view/courses/course-rating";
import CourseReviews from "@/components/student-view/courses/course-reviews";
import { getCourseReviewsService } from "@/services";

const [reviews, setReviews] = useState([]);
const [averageRating, setAverageRating] = useState(0);

const fetchReviews = async () => {
  try {
    const response = await getCourseReviewsService(courseId);
    if (response.success) {
      setReviews(response.data.reviews);
      setAverageRating(response.data.averageRating);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

useEffect(() => {
  fetchReviews();
}, [courseId]);

<div className="mt-8">
  {hasPurchased && (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Rate this Course</h2>
      <CourseRating courseId={courseId} onRatingSubmitted={fetchReviews} />
    </div>
  )}
  
  <div>
    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
    <CourseReviews reviews={reviews} averageRating={averageRating} />
  </div>
</div> 