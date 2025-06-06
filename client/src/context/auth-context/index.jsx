// import { Skeleton } from "@/components/ui/skeleton";
// import { initialSignInFormData, initialSignUpFormData } from "@/config";
// import { checkAuthService, loginService, registerService } from "@/services";
// import { createContext, useEffect, useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
//   const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
//   const [auth, setAuth] = useState({
//     authenticate: false,
//     user: null,
//   });
//   const [loading, setLoading] = useState(true);

//   // async function handleRegisterUser(event) {
//   //   event.preventDefault();
//   //   const data = await registerService(signUpFormData);
//   //   if(data?.success) {
//   //     toast.sucess(data.message);
//   //   }
//   // }

//   // async function handleRegisterUser(event) {
//   //   event.preventDefault();
//   //   const data = await registerService(signUpFormData);

//   //   if (data.success) {
//   //     sessionStorage.setItem(
//   //       "accessToken",
//   //       JSON.stringify(data.data.accessToken)
//   //     );
//   //     setAuth({
//   //       authenticate: true,
//   //       user: data.data.user,
//   //     });
//   //     return { success: true }; // ✅ FIXED
//   //   } else {
//   //     return { success: false }; // ✅ FIXED
//   //   }
//   // }

//   // async function handleLoginUser(event) {
//   //   event.preventDefault();
//   //   const data = await loginService(signInFormData);
//   //   console.log(data, "datadatadatadatadata");

//   //   if (data.success) {
//   //     sessionStorage.setItem(
//   //       "accessToken",
//   //       JSON.stringify(data.data.accessToken)
//   //     );
//   //     setAuth({
//   //       authenticate: true,
//   //       user: data.data.user,
//   //     });
//   //     return { success: true }; // ✅ RETURN THIS
//   //   } else {
//   //     setAuth({
//   //       authenticate: false,
//   //       user: null,
//   //     });
//   //     return { success: false }; // ✅ keep this
//   //   }
//   // }
//   // naya

//   async function handleRegisterUser(event) {
//   event.preventDefault();
//   const data = await registerService(signUpFormData);

//   if (data.success) {
//     sessionStorage.setItem(
//       "accessToken",
//       JSON.stringify(data.data.accessToken)
//     );
//     setAuth({
//       authenticate: true,
//       user: data.data.user,
//     });
//     return { success: true };
//   } else {
//     return { success: false };
//   }
// }

// async function handleLoginUser(event) {
//   event.preventDefault();
//   const data = await loginService(signInFormData);

//   // console.log(data.data.user)
//   if (data.success) {
//     sessionStorage.setItem(
//       "accessToken",
//       JSON.stringify(data.data.accessToken)
//     );
//     setAuth({
//       authenticate: true,
//       user: data.data.user,
//     });
//     return { success: true };
    
//   } else {
//     setAuth({
//       authenticate: false,
//       user: null,
//     });
//     return { success: false };
//   }
// }

//   //check auth user

//   async function checkAuthUser() {
//     try {
//       const data = await checkAuthService();
//       if (data.success) {
//         setAuth({
//           authenticate: true,
//           user: data.data.user,
//         });
//         setLoading(false);
//       } else {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       if (!error?.response?.data?.success) {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     }
//   }

//   function resetCredentials() {
//     setAuth({
//       authenticate: false,
//       user: null,
//     });
//   }

//   useEffect(() => {
//     checkAuthUser();
//   }, []);


//   return (
//     <AuthContext.Provider
//       value={{
//         signInFormData,
//         setSignInFormData,
//         signUpFormData,
//         setSignUpFormData,
//         handleRegisterUser,
//         handleLoginUser,
//         auth,
//         resetCredentials,
//       }}
//     >
//       {loading ? <Skeleton /> : children}
//     </AuthContext.Provider>
//   );
// }
// naya
import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  // Updated registration function for email verification flow
  async function handleRegisterUser(event) {
    event.preventDefault();
    try {
      const data = await registerService(signUpFormData);
      
      // With email verification, registration doesn't immediately authenticate
      // Just return the result - no auth state changes until email is verified
      return {
        success: data.success,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed"
      };
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);

      if (data.success) {
        // Use sessionStorage consistently
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        return { 
          success: true,
          message: data.message 
        };
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        return { 
          success: false,
          message: data.message 
        };
      }
    } catch (error) {
      setAuth({
        authenticate: false,
        user: null,
      });
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
  }

  // Function to manually set auth state (for email verification)
  function setAuthState(authData) {
    setAuth(authData);
  }

  // Check auth user
  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
    // Also clear stored token
    sessionStorage.removeItem("accessToken");
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        setAuth: setAuthState, // Expose setAuth function
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}