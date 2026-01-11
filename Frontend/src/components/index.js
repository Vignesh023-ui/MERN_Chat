import { lazy } from "react";

const NavBar = lazy(() => import("./ui/NavBar"));
const DotLoader = lazy(() => import("./custom/DotLoader"));

const Authorization = lazy(() => import("./custom/Authorization"));
const AuthImagePattern = lazy(() => import("./custom/AuthImagePattern"));

const SideBar = lazy(() => import("./ui/SideBar"));
const WelcomeContainer = lazy(() => import("./ui/WelcomeContainer"));

const ChatContainer = lazy(() => import("./ui/ChatContainer"));
const ChatHeader = lazy(() => import("./ui/ChatHeader"));
const ChatInput = lazy(() => import("./ui/ChatInput"));

const MessageSkeleton = lazy(() => import("./custom/MessageSkeleton"));
const UserSkeleton = lazy(() => import("./custom/UserSkeleton"));

export {
  NavBar,
  DotLoader,
  Authorization,
  AuthImagePattern,
  SideBar,
  WelcomeContainer,
  ChatContainer,
  ChatHeader,
  ChatInput,
  MessageSkeleton,
  UserSkeleton,
};
