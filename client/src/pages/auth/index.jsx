import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AuthPage() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    auth,
  } = useContext(AuthContext);

  // Check URL parameters for tab selection and redirect URL
  useEffect(() => {
    if (auth?.authenticate) {
      // Redirect based on role
      if (auth.user?.role === "instructor") {
        navigate("/instructor");
      } else {
        const params = new URLSearchParams(location.search);
        const redirect = params.get("redirect");
        if (redirect) {
          navigate(redirect);
        } else {
          navigate("/");
        }
      }
      return;
    }

    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "signin" || tab === "signup") {
      setActiveTab(tab);
    }
  }, [auth?.authenticate, auth?.user, location.search, navigate]);


  function handleTabChange(value) {
    setActiveTab(value);
    // Update the URL when tab changes without triggering a full navigation
    const params = new URLSearchParams(location.search);
    params.set("tab", value);
    const redirect = params.get("redirect");

    // Construct the new URL with updated tab parameter
    let newUrl = `/auth?tab=${value}`;
    if (redirect) {
      newUrl += `&redirect=${redirect}`;
    }

    // Use history.replaceState to update the URL without navigation
    window.history.replaceState({}, "", newUrl);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  // async function handleLogin(event) {
  //   event.preventDefault();

  //   try {
  //     const data = await handleLoginUser(event);

  //     if (data?.success) {
  //       toast({
  //         title: "Login Successful",
  //         description: "Welcome back!",
  //       });

  //       const params = new URLSearchParams(location.search);
  //       const redirect = params.get("redirect");
  //       if (redirect) {
  //         navigate(redirect);
  //       } else {
  //         navigate("/");
  //       }
  //     }
  //   } catch(err) {
  //     console.error(err);
  //     toast({
  //       title: "Login Failed",
  //       description: "Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // }
  // naya
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const data = await handleLoginUser(event);

      if (data?.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });

        const params = new URLSearchParams(location.search);
        const redirect = params.get("redirect");
        if (redirect) {
          navigate(redirect);
        } else {
          navigate("/");
        }
      } else {
        toast({
          title: "Login Failed",
          description: data?.message || "Something went wrong while logging in.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);

      const message = err?.response?.data?.message || err.message || "Please try again.";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    }
  }



  // async function handleRegister(event) {
  //   event.preventDefault();

  //   try {
  //     const data = await handleRegisterUser(event);

  //     if (data?.success) {
  //       toast({
  //         title: "Signup Successful",
  //         description: "Your account has been created.",
  //       });

  //       const params = new URLSearchParams(location.search);
  //       const redirect = params.get("redirect");
  //       if (redirect) {
  //         navigate(redirect);
  //       } else {
  //         navigate("/");
  //       }
  //     } else {
  //       toast({
  //         title: "Signup Failed",
  //         description: "Something went wrong while creating your account.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast({
  //       title: "Signup Failed",
  //       description: "Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // }
  // naya
  async function handleRegister(event) {
    event.preventDefault();
  
    try {
      const data = await handleRegisterUser(event);
  
      if (data?.success) {
        toast({
          title: "Registration Successful",
          description: data.message || "Please check your email and click the verification link to complete your registration.",
        });
        
        // Clear the form after successful registration
        setSignUpFormData({
          userName: "",
          userEmail: "",
          password: "",
          role: "student" // or whatever default role you use
        });
        
        // Don't navigate - user needs to verify email first
      } else {
        toast({
          title: "Registration Failed",
          description: data?.message || "Something went wrong while creating your account.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
  
      const message = err?.response?.data?.message || err.message || "Please try again.";
      toast({
        title: "Registration Failed",
        description: message,
        variant: "destructive",
      });
    }
  }



  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <img src="/logo.png" alt="Revoc Logo" className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">Revoc Learning</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLogin}
                  showPasswordCheck={false}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegister}
                  showPasswordCheck={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;