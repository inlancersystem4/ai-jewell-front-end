import { GoogleOAuthProvider } from "@react-oauth/google";

export const AuthProvider = ({ children }) => {
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientID}>{children}</GoogleOAuthProvider>
  );
};
