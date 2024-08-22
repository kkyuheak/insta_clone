import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProtectRoute from "./components/ProtectRoute";

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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
