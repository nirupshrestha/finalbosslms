import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust the path if needed

function NotFoundPage() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you are looking for does not exist.</p>
      <Button onClick={handleReturnHome}>Return to Home Page</Button>
    </div>
  );
}

export default NotFoundPage;

