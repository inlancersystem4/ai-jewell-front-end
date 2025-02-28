import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const AuthGuard = () => {
  const token = useSelector((state) => state.auth.jwtToken);
  const expired = useSelector((state) => state.auth.expired_at);

  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = expired && expired < currentTime;

  const auth = token && !isExpired;

  return auth ? <Outlet /> : <Navigate to="/auth" />;
};
