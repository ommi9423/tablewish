
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="font-serif text-6xl font-medium mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-8">We couldn't find the page you're looking for.</p>
        <Button 
          asChild
          className="bg-black hover:bg-black/80 text-white px-6"
        >
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
