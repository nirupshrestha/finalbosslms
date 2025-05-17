import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  console.log(authenticated, user, "useruser");

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (authenticated && location.pathname === "/auth") {
  if (user?.role === "instructor") {
    return <Navigate to="/instructor" />;
  } else {
    return <Navigate to="/" />;
  }
}

  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
