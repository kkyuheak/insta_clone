import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectRoute from "./components/ProtectRoute";
import Upload from "./pages/Upload";
import MyPage from "./pages/MyPage";
import Saved from "./components/myPage/Saved";
import UserPosts from "./components/myPage/UserPosts";

const userinfo = sessionStorage.getItem("user");

const router = createBrowserRouter([
  {
    path: "/",
    element: userinfo ? <Home /> : <LoginPage />,
  },
  {
    path: "/login",
    element: (
      <ProtectRoute user={userinfo}>
        <LoginPage />
      </ProtectRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectRoute user={userinfo}>
        <SignUp />
      </ProtectRoute>
    ),
  },
  {
    path: "/upload",
    element: userinfo ? <Upload /> : <LoginPage />,
  },
  {
    path: "/:userId",
    element: (
      <>
        <MyPage />
      </>
    ),
    children: [
      {
        path: "posts",
        element: <UserPosts />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
