
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
  type?: 'sign-in' | 'sign-up';
}

const AuthPage: React.FC<AuthPageProps> = ({ type = 'sign-in' }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-medium text-gray-900">
            {type === 'sign-in' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        
        <div className="mt-8">
          {type === 'sign-in' ? (
            <SignIn 
              routing="path" 
              path="/sign-in" 
              redirectUrl="/"
              signUpUrl="/sign-up"
            />
          ) : (
            <SignUp 
              routing="path" 
              path="/sign-up" 
              redirectUrl="/"
              signInUrl="/sign-in"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
