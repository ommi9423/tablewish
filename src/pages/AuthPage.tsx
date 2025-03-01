
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthPageProps {
  type?: 'sign-in' | 'sign-up';
}

const AuthPage: React.FC<AuthPageProps> = ({ type = 'sign-in' }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-medium text-gray-900">
            {type === 'sign-in' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {type === 'sign-in' 
              ? 'Sign in to access your reservations and favorites' 
              : 'Join BookATable to start making restaurant reservations'}
          </p>
        </div>
        
        <div className="mt-8">
          {type === 'sign-in' ? (
            <SignIn 
              routing="path" 
              path="/sign-in" 
              redirectUrl="/"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-black hover:bg-black/80 text-sm',
                  footerActionLink: 'text-black hover:text-black/80'
                }
              }}
            />
          ) : (
            <SignUp 
              routing="path" 
              path="/sign-up" 
              redirectUrl="/"
              signInUrl="/sign-in"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-black hover:bg-black/80 text-sm',
                  footerActionLink: 'text-black hover:text-black/80'
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
