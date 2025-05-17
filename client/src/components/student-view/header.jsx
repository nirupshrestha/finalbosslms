// import { GraduationCap, TvMinimalPlay, } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "@/context/auth-context";
// import { useToast } from "@/hooks/use-toast";



// function StudentViewCommonHeader() {
//   const navigate = useNavigate();
//   const { auth, resetCredentials } = useContext(AuthContext);
//   const isAuthenticated = auth?.authenticate;
//   const [isInstructor, setIsInstructor] = useState(false);
//   const {toast} = useToast();

//   useEffect(() => {
//     if(auth?.user?.role === "instructor" || auth?.user === "instructor"){
//       setIsInstructor(true);
//     } else {
//       setIsInstructor(false);
//     }
//   },[auth?.user]);

//   function handleLogout() {
//     navigate("/")
//     resetCredentials();
//     sessionStorage.clear();
//     toast({
//           title: "Logged Out",
//           description: "See you again",
//         });

//   }

//   // Navigation to auth page with tab selection
//   function navigateToAuth(tab) {
//     navigate(`/auth?tab=${tab}`);
//   }

//   return (
//     <header className="flex items-center justify-between p-4 border-b relative">
//       <div className="flex items-center space-x-4">
//         <Link to="/home" className="flex items-center hover:text-black">
//           <img src="/logo.png" alt="Revoc Logo" className="h-8 w-8 mr-4" />
//           <span className="font-extrabold md:text-xl text-[14px]">
//             Revoc Learning
//           </span>
//         </Link>
//         <div className="flex items-center space-x-1">
//           <Button
//             variant="ghost"
//             onClick={() => {
//               location.pathname.includes("/courses")
//                 ? null
//                 : navigate("/courses");
//             }}
//             className="text-[14px] md:text-[16px] font-medium"
//           >
//             Explore Courses
//           </Button>
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         {isAuthenticated ? (
//           <div className="flex gap-4 items-center">
//             {isInstructor ? (
//               <div
//                 onClick={() => navigate("/instructor")}
//                 className="flex cursor-pointer items-center gap-3"
//               >
//                 <span className="font-extrabold md:text-xl text-[14px]">
//                   My Dashboard
//                 </span>
//                 <GraduationCap className="w-8 h-8 cursor-pointer" />
//               </div>
//             ) : (
//               <div
//                 onClick={() => navigate("/student/courses")}
//                 className="flex cursor-pointer items-center gap-3"
//               >
//                 <span className="font-extrabold md:text-xl text-[14px]">
//                   My Courses
//                 </span>
//                 <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
//               </div>
//             )}
//             <Button 
//               onClick={handleLogout}
//               className="bg-[#0f0147] text-white hover:bg-[#32179c] transition duration-200"
//             >
//               Sign Out
//             </Button>
//           </div>
//         ) : (
//           <div className="flex gap-4 items-center">
//             <Button
//               onClick={() => navigateToAuth("signin")}
//               className="border-2 border-[#0f0147] text-[#0f0147] bg-transparent hover:bg-[#32179c] hover:text-white transition duration-200"
//             >
//               Sign In
//             </Button>
//             <Button
//               onClick={() => navigateToAuth("signup")}
//               className="bg-[#0f0147] text-white hover:bg-[#32179c] transition duration-200"
//             >
//               Sign Up
//             </Button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default StudentViewCommonHeader;
import {
  ShoppingCart,
  ChevronDown,
  Search
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { auth, resetCredentials } = useContext(AuthContext);
  const isAuthenticated = auth?.authenticate;
  const user = auth?.user;
  const [isInstructor, setIsInstructor] = useState(false);
  const { toast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user?.role === "instructor" || user === "instructor") {
      setIsInstructor(true);
    } else {
      setIsInstructor(false);
    }
  }, [user]);

  // Effect hook to update the searchQuery when the URL changes
  useEffect(() => {
    const query = searchParams.get("search") || "";  // Get the search query from the URL
    setSearchQuery(query);  // Set the local state searchQuery
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    navigate("/");
    resetCredentials();
    sessionStorage.clear();
    toast({
      title: "Logged Out",
      description: "See you again",
    });
  }

  function navigateToAuth(tab) {
    navigate(`/auth?tab=${tab}`);
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);  // Update the local searchQuery state
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Navigate to courses page with search param if not already there
    if (!location.pathname.includes("/courses")) {
      sessionStorage.removeItem("filters");
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // Just update the search params if already on courses page
      setSearchParams({ search: searchQuery });
    }
  };

  // Handle pressing Enter in search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      {/* Logo + Explore */}
      <div className="flex items-center space-x-6">
        <Link to="/home" className="flex items-center hover:text-black">
          <img src="/logo.png" alt="Revoc Logo" className="h-10 w-10 mr-3" />
          <span className="font-extrabold text-lg md:text-2xl text-[#0f0147]">
            Revoc Learning
          </span>
        </Link>
        <Button
          variant="ghost"
          onClick={() =>
            location.pathname.includes("/courses")
              ? null
              : navigate("/courses")
          }
          className="text-sm md:text-base font-medium text-[#0f0147] hover:underline"
        >
          Explore Courses
        </Button>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 mx-6 relative">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search courses..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32179c] shadow-sm placeholder:text-gray-500 text-sm pr-10"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#32179c]"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4 relative">
        {isAuthenticated ? (
          <>
            {/* Cart */}
            {/* <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button> */}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] hover:bg-[#e7e7e7] rounded-full shadow-sm transition"
              >
                <span className="text-sm font-medium text-gray-800">
                  {user?.userName || "User"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl z-50 p-2 space-y-1">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      isInstructor
                        ? navigate("/instructor")
                        : navigate("/student/courses");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {isInstructor ? "My Dashboard" : "My Courses"}
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/edit-profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Edit Profile
                  </button>
                  {/* <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/student/change-password");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Change Password
                  </button> */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-3 items-center">
            <Button
              onClick={() => navigateToAuth("signin")}
              className="text-sm font-medium border border-[#0f0147] text-[#0f0147] bg-white hover:bg-[#0f0147] hover:text-white rounded-full px-4 py-2 transition"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigateToAuth("signup")}
              className="text-sm font-medium bg-[#0f0147] text-white hover:bg-[#32179c] rounded-full px-4 py-2 transition"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;