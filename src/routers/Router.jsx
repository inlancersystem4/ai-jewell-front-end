import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import { AuthGuard } from "@/middleware";

const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const App = lazy(() => import("@/pages/App"));
const Projects = lazy(() => import("@/pages/Projects"));

const ChatLayout = lazy(() => import("@/layout/ChatLayout"));
const AuthLayout = lazy(() => import("@/layout/AuthLayout"));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route element={<AuthGuard />}>
            <Route path="" element={<ChatLayout />}>
              <Route index element={<App />} />
              <Route path="projects" element={<Projects />} />
            </Route>
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Loader() {
  return (
    <main className="w-full h-dvh flex items-center justify-center">
      <p>Loading...</p>
    </main>
  );
}

export default Router;
