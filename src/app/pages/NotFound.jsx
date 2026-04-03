import React from 'react';
import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
