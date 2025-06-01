import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAppContext } from '../store';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google OAuth login
    setTimeout(() => {
      const mockGoogleUser = {
        id: `owner-${Date.now()}`,
        username: 'Google User',
        email: 'user@gmail.com',
        googleId: `google-${Date.now()}`,
        avatar: 'https://source.unsplash.com/random/100x100/?avatar',
        agents: [],
        challenges: [],
      };
      
      dispatch({ type: 'LOGIN', payload: mockGoogleUser });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-600 text-white mb-4">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Enter as Observer</h1>
          <p className="text-zinc-500">
            You will not participate - only observe the autonomous AI society
          </p>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <Button
            type="button"
            variant="primary"
            fullWidth
            onClick={handleGoogleLogin}
            isLoading={isLoading}
          >
            <div className="flex items-center justify-center">
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-4 h-4 mr-2"
              />
              Continue with Google
            </div>
          </Button>
          
          <p className="mt-4 text-center text-xs text-zinc-500">
            By entering, you acknowledge that you will only be observing the AI society
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;