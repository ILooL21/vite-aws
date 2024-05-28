import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { useLoginMutation } from "../slices/userApiSlice";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import "../styles/Form.css";

const FormAuth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const toggleForm = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login berhasil!");
    } catch (err) {
      setEmail("");
      setPassword("");
      toast.error(err?.data?.msg || err.error);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (password === "" || confirmPassword === "" || email === "" || username === "") {
      toast.error("Please fill in all fields");
    } else {
      try {
        await register({ username, email, password }).unwrap();
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("Penambahan user berhasil! Silahkan login");
      } catch (err) {
        toast.error(err?.data?.msg || err.error);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div
          className={isActive ? "container active" : "container"}
          id="container">
          <div className="form-container sign-up">
            <form onSubmit={registerHandler}>
              <h1>Daftar</h1>
              <span>Daftarkan dirimu dengan mengisi data dibawah</span>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                disabled={isLoading}
                type="submit">
                Daftar
              </button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={loginHandler}>
              <h1>Masuk</h1>
              <span>Login untuk menggunakan semua fitur</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={isLoading}
                type="submit">
                Masuk
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <a href="/">
                  <HomeOutlined
                    style={{
                      fontSize: "2rem",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </a>
                <h1>Selamat Datang!</h1>
                <p>Sudah memiliki akun? </p>
                <button
                  className="hidden"
                  id="login"
                  onClick={toggleForm}>
                  Masuk
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <a href="/">
                  <HomeOutlined
                    style={{
                      fontSize: "2rem",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </a>
                <h1>Hello, Friend!</h1>
                <p>Belum Punya Akun? </p>
                <button
                  className="hidden"
                  id="register"
                  onClick={toggleForm}>
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </div>
      </FormContainer>
    </>
  );
};

export default FormAuth;
