import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "@/pages";
import ShortLinkRedirect from "@/pages/short-link-redirect";
import AuthLayout from "@/components/layouts/auth-layout";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import NotFound from "@/pages/not-found";
import ProtectedRoutes from "./protected-routes";
import Dashboard from "@/pages/dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* PRIVATE ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/not-found" element={<NotFound />} />

      <Route path="/:shortLink" element={<ShortLinkRedirect />} />

      <Route path="*" element={<NotFound />} />
    </>
  )
);
