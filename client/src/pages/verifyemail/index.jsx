import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/auth-context";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAuth } = useContext(AuthContext); // Add this to update auth context

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        
        
        const response = await axios.get(`http://localhost:5000/auth/verify/${token}`);
        
        

        if (response.data.success) {
          toast({
            title: "Email Verified",
            description: response.data.message || "Your email has been successfully verified.",
          });

          const { accessToken, user } = response.data.data;
          
          console.log('Storing token and updating auth:', { accessToken, user });
          
          // Store token in sessionStorage (consistent with AuthContext)
          sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
          
          // Update AuthContext with authenticated user
          setAuth({
            authenticate: true,
            user: user
          });

          // Redirect based on user role
          if (user.role === "instructor") {
            navigate('/instructor');
          } else {
            navigate('/');
          }
        } else {
          console.log('Verification failed:', response.data);
          toast({
            title: "Verification Failed",
            description: response.data.message || "Email verification failed.",
            variant: "destructive",
          });
          navigate('/auth?tab=signin');
        }
      } catch (error) {
        console.error('Verification error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url
        });
        
        toast({
          title: "Error Occurred",
          description: error.response?.data?.message || error.message || "An error occurred during verification.",
          variant: "destructive",
        });
        navigate('/auth?tab=signin');
      }
    };

    if (token) {
      verifyUserEmail();
    } else {
      toast({
        title: "Token Missing",
        description: "Verification token is missing in the URL.",
        variant: "destructive",
      });
      navigate('/auth?tab=signin');
    }

  }, [token, navigate, toast, setAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Verifying your email...</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;