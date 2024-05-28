import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo.user.role === "admin") {
    return <Outlet />;
  } else {
    toast.error("You are not authorized to view this page");
    return (
      <>
        <Navigate
          to="/"
          replace
        />
      </>
    );
  }
};
export default AdminRoute;
