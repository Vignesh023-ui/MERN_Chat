import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { NavBar, DotLoader, Authorization } from "./components";
import {
  HomePage,
  SignUpPage,
  LoginPage,
  SettingsPage,
  ProfilePage,
  NotFoundPage,
} from "./pages";
import { Toaster } from "react-hot-toast";

import useAuthStore from "./store/useAuthStore";
import useThemeStore from "./store/useThemeStore";

const App = () => {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth().finally(() => setAppReady(true));
  }, [checkAuth]);

  // * console.log(user);

  if (isCheckingAuth || !appReady) {
    return <DotLoader />;
  }

  return (
    <main className="min-h-screen overflow-auto" data-theme={theme}>
      <NavBar />

      <Suspense fallback={<DotLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Authorization>
                <HomePage />
              </Authorization>
            }
          />

          <Route
            path="/signup"
            element={
              <Authorization>
                <SignUpPage />
              </Authorization>
            }
          />
          <Route
            path="/login"
            element={
              <Authorization>
                <LoginPage />
              </Authorization>
            }
          />

          <Route
            path="/settings"
            element={
              <Authorization>
                <SettingsPage />
              </Authorization>
            }
          />
          <Route
            path="/profile"
            element={
              <Authorization>
                <ProfilePage />
              </Authorization>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Toaster />
    </main>
  );
};
export default App;
