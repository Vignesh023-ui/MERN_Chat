import React from "react";
import { Link } from "react-router-dom";

import { MessageCircleWarning } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-16 bg-base-100">
      <div className="text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageCircleWarning className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Not Found Text */}
        <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
        <p className="text-base-content/60">
          Oops! The page you are looking for doesn't exist.
        </p>

        {/* Link to Navigate Home */}
        <Link to="/" className="btn btn-primary text-white mt-6">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
