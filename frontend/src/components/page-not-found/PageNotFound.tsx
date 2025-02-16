import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <FileQuestion className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
}
