import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const SignUpPage = lazy(() => import("./SignUpPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const SettingsPage = lazy(() => import("./SettingsPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));

const NotFoundPage = lazy(() => import("./NotFoundPage"));

export {
  HomePage,
  SignUpPage,
  LoginPage,
  SettingsPage,
  ProfilePage,
  NotFoundPage,
};
