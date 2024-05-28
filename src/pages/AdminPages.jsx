import NavbarAdmin from "../components/admin/NavbarAdmin.jsx";
import { useSelector } from "react-redux";

const AdminPages = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <NavbarAdmin />
      <div
        className="container-admin-dashboard"
        style={{
          backgroundColor: "#f0f8ff",
          padding: "20px",
          margin: "20px auto",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          textAlign: "center",
        }}>
        <h1
          style={{
            fontSize: "2rem",
            color: "#333",
            marginBottom: "20px",
            fontWeight: "bold",
          }}>
          Selamat Datang Di Dashboard Admin, {userInfo.user.username}!
        </h1>
      </div>
    </>
  );
};

export default AdminPages;
