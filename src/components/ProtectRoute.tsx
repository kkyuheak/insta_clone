import { Navigate } from "react-router-dom";

interface IProtectRoute {
  user: string | null;
  children: React.ReactNode;
}

const ProtectRoute = ({ user, children }: IProtectRoute) => {
  if (user) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectRoute;
