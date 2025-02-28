import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const AuthGuard = () => {
  const token = useSelector((state) => state.auth.jwtToken);

  const auth = token;

  return auth ? <Outlet /> : <Navigate to="/auth" />;
};
