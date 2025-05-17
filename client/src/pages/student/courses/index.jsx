// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
// import { Skeleton } from "@/components/ui/skeleton";
// import { filterOptions, sortOptions } from "@/config";
// import { AuthContext } from "@/context/auth-context";
// import { StudentContext } from "@/context/student-context";
// import {
//   checkCoursePurchaseInfoService,
//   fetchStudentViewCourseListService,
// } from "@/services";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");

//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   return queryParams.join("&");
// }

// function StudentViewCoursesPage() {
//   const [sort, setSort] = useState("price-lowtohigh");
//   const [filters, setFilters] = useState({});
//   const [searchParams, setSearchParams] = useSearchParams();
//   const {
//     studentViewCoursesList,
//     setStudentViewCoursesList,
//     loadingState,
//     setLoadingState,
//   } = useContext(StudentContext);
//   const navigate = useNavigate();
//   const { auth } = useContext(AuthContext);
//   const [searchQuery, setSearchQuery] = useState('');

//   function handleFilterOnChange(getSectionId, getCurrentOption) {
//     let cpyFilters = { ...filters };
//     const indexOfCurrentSeection =
//       Object.keys(cpyFilters).indexOf(getSectionId);

//     console.log(indexOfCurrentSeection, getSectionId);
//     if (indexOfCurrentSeection === -1) {
//       cpyFilters = {
//         ...cpyFilters,
//         [getSectionId]: [getCurrentOption.id],
//       };

//       console.log(cpyFilters);
//     } else {
//       const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
//         getCurrentOption.id
//       );

//       if (indexOfCurrentOption === -1)
//         cpyFilters[getSectionId].push(getCurrentOption.id);
//       else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//     }

//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//   }

//   async function fetchAllStudentViewCourses(filters, sort, searchQuery) {
//     const query = new URLSearchParams({
//       ...filters,
//       sortBy: sort,
//       search: searchQuery,
//     });
//     const response = await fetchStudentViewCourseListService(query);
//     if (response?.success) {
//       setStudentViewCoursesList(response?.data);
//       setLoadingState(false);
//     }
//   }

//   async function handleCourseNavigate(getCurrentCourseId) {
//     const response = await checkCoursePurchaseInfoService(
//       getCurrentCourseId,
//       auth?.user?._id
//     );

//     if (response?.success) {
//       if (response?.data) {
//         //  console.log(response.data);
//         navigate(`/student/course-progress/${getCurrentCourseId}`);
//       } else {
//         // console.log("here is it");
//         navigate(`/course/details/${getCurrentCourseId}`);
//       }
//     }
//   }

//   useEffect(() => {
//     const buildQueryStringForFilters = createSearchParamsHelper(filters);
//     setSearchParams(new URLSearchParams(buildQueryStringForFilters));
//   }, [filters]);

//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, []);

//   useEffect(() => {
//     if (filters !== null && sort !== null)
//       fetchAllStudentViewCourses(filters, sort);
//   }, [filters, sort]);

//   useEffect(() => {
//     return () => {
//       sessionStorage.removeItem("filters");
//     };
//   }, []);

//   useEffect(() => {
//     const query = searchParams.get("search") || "";  // Get the search query from the URL
//     setSearchQuery(query);  // Set the local searchQuery state
//   }, [searchParams]);

//   // Call the fetch function when searchQuery changes
//   useEffect(() => {
//     if (filters !== null && sort !== null) {
//       fetchAllStudentViewCourses(filters, sort, searchQuery);  // Pass searchQuery
//     }
//   }, [filters, sort, searchQuery]);  // Re-run when searchQuery changes

//   console.log(loadingState, "loadingState");

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">All Courses</h1>
//       <div className="flex flex-col md:flex-row gap-4">
//         <aside className="w-full md:w-64 space-y-4">
//           <div>
//             {Object.keys(filterOptions).map((ketItem) => (
//               <div className="p-4 border-b">
//                 <h3 className="font-bold mb-3">{ketItem.toUpperCase()}</h3>
//                 <div className="grid gap-2 mt-2">
//                   {filterOptions[ketItem].map((option) => (
//                     <Label className="flex font-medium items-center gap-3">
//                       <Checkbox
//                         checked={
//                           filters &&
//                           Object.keys(filters).length > 0 &&
//                           filters[ketItem] &&
//                           filters[ketItem].indexOf(option.id) > -1
//                         }
//                         onCheckedChange={() =>
//                           handleFilterOnChange(ketItem, option)
//                         }
//                       />
//                       {option.label}
//                     </Label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//         <main className="flex-1">
//           <div className="flex justify-end items-center mb-4 gap-5">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-2 p-5"
//                 >
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <span className="text-[16px] font-medium">Sort By</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[180px]">
//                 <DropdownMenuRadioGroup
//                   value={sort}
//                   onValueChange={(value) => setSort(value)}
//                 >
//                   {sortOptions.map((sortItem) => (
//                     <DropdownMenuRadioItem
//                       value={sortItem.id}
//                       key={sortItem.id}
//                     >
//                       {sortItem.label}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <span className="text-sm text-black font-bold">
//               {studentViewCoursesList.length} Results
//             </span>
//           </div>
//           <div className="space-y-4">
//             {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
//               studentViewCoursesList.map((courseItem) => (
//                 <Card
//                   onClick={() => handleCourseNavigate(courseItem?._id)}
//                   className="cursor-pointer"
//                   key={courseItem?._id}
//                 >
//                   <CardContent className="flex gap-4 p-4">

//                     <div className="w-48 h-32 flex-shrink-0">
//                       <img
//                         src={courseItem?.image}
//                         className="w-ful h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <CardTitle className="text-xl mb-2">
//                         {courseItem?.title}
//                       </CardTitle>
//                       <p className="text-sm text-gray-600 mb-1">
//                         Created By{" "}
//                         <span className="font-bold">
//                           {courseItem?.instructorName}
//                         </span>
//                       </p>
//                       <p className="text-[16px] text-gray-600 mt-3 mb-2">
//                         {`${courseItem?.curriculum?.length} ${courseItem?.curriculum?.length <= 1
//                           ? "Lecture"
//                           : "Lectures"
//                           } - ${courseItem?.level.toUpperCase()} Level`}
//                       </p>
//                       <p className="font-bold text-lg">
//                         ${courseItem?.pricing}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : loadingState ? (
//               <Skeleton />
//             ) : (
//               <h1 className="font-extrabold text-4xl">No Courses Found</h1>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default StudentViewCoursesPage;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams, searchQuery) {
  const queryParams = [];

  // Add filter parameters
  if (filterParams && typeof filterParams === 'object') {
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        queryParams.push(`${key}=${encodeURIComponent(value.join(','))}`);
      }
    }
  }

  // Add search query if it exists
  if (searchQuery && searchQuery.trim() !== "") {
    queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  // Update this function in StudentViewCoursesPage.jsx
  // Fix 1: Update fetchAllStudentViewCourses in StudentViewCoursesPage.jsx
  async function fetchAllStudentViewCourses(filters, sort, searchQuery) {
  setLoadingState(true);

  try {
    // Build query string correctly
    const queryParams = new URLSearchParams();

    // Add filters
    if (filters) {
      Object.entries(filters).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          queryParams.append(key, values.join(','));
        }
      });
    }

    // Add sort parameter
    if (sort) {
      queryParams.append('sortBy', sort);
    }

    // Add search parameter - ensure proper trimming
    if (searchQuery && searchQuery.trim() !== '') {
      queryParams.append('search', searchQuery.trim());
    }

    // Convert URLSearchParams to string before passing to the service
    const queryString = queryParams.toString();
    console.log("Search query being sent to API:", queryString);

    const response = await fetchStudentViewCourseListService(queryString);

    if (response?.success) {
      console.log("Courses returned:", response.data.length);
      setStudentViewCoursesList(response?.data);
    } else {
      console.error("Failed to fetch courses:", response?.message);
      setStudentViewCoursesList([]);
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    setStudentViewCoursesList([]);
  } finally {
    setLoadingState(false);
  }
}

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/student/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  // Update URL when filters change while preserving search query
 useEffect(() => {
  const params = new URLSearchParams(searchParams);
  const currentSearch = params.get('search') || '';

  const newQueryString = createSearchParamsHelper(filters, currentSearch);
  setSearchParams(new URLSearchParams(newQueryString));
}, [filters]);

  // Load saved filters from session storage on initial load
  useEffect(() => {
    setSort("price-lowtohigh");
    const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(savedFilters);
  }, []);

  // Detect search param changes from URL
useEffect(() => {
  const newSearchQuery = searchParams.get("search") || "";
  if (newSearchQuery !== searchQuery) {
    setSearchQuery(newSearchQuery);
  }
}, [searchParams]);

 // Fetch courses when filters, sort or search changes
useEffect(() => {
  fetchAllStudentViewCourses(filters, sort, searchQuery);
}, [filters, sort, searchQuery]);

  // Clean up filters on unmount
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>

      {/* Show search results heading if there's a search query */}
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Search results for: <span className="text-[#32179c]">"{searchQuery}"</span>
          </h2>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            {Object.keys(filterOptions).map((keyItem) => (
              <div className="p-4 border-b" key={keyItem}>
                <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label className="flex font-medium items-center gap-3" key={option.id}>
                      <Checkbox
                        checked={
                          filters &&
                          filters[keyItem] &&
                          filters[keyItem].includes(option.id)
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {studentViewCoursesList.length} Results
            </span>
          </div>

          <div className="space-y-4">
            {loadingState ? (
              // Show skeletons when loading
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="flex gap-4 p-4">
                    <Skeleton className="w-48 h-32 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-6 w-16 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseItem) => (
                <Card
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="cursor-pointer hover:shadow-md transition"
                  key={courseItem?._id}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.image}
                        className="w-full h-full object-cover rounded"
                        alt={courseItem?.title}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{courseItem?.title}</CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By{" "}
                        <span className="font-bold">
                          {courseItem?.instructorName}
                        </span>
                      </p>
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {`${courseItem?.curriculum?.length} ${courseItem?.curriculum?.length <= 1 ? "Lecture" : "Lectures"
                          } - ${courseItem?.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">${courseItem?.pricing}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <h1 className="font-extrabold text-2xl mb-2">No Courses Found</h1>
                {searchQuery && (
                  <p className="text-gray-600">
                    No results for "{searchQuery}". Try a different search term or browse all courses.
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;