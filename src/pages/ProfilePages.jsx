import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetUserDataMutation, useUpdateUserDataMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Profile.css";

const ProfilePages = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [getUserData] = useGetUserDataMutation();
  const [updateUserData] = useUpdateUserDataMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUsername(data.data.user.username);
        setEmail(data.data.user.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [getUserData]);

  const updateProfile = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await updateUserData({
          username: username,
          email: email,
          oldpassword: oldPassword,
          newpassword: newPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.location.reload();
      } catch (err) {
        toast.error(err?.data?.msg || err.error);
      }
    }
  };

  return (
    <>
      <Header />
      <div>
        <form
          onSubmit={updateProfile}
          className="form-profile-update">
          <h1>Profile Pages</h1>
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder={email}
            name="email"
            disabled
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            name="newpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Simpan Perubahan</button>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePages;
