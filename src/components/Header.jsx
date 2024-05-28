import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useGetCategoriesQuery } from "../slices/CategoryApiSlice";
import { logout } from "../slices/authSlice";
import { Layout, Dropdown, Space, Col } from "antd";
import { DownOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import img from "../assets/logo.png";
import "../styles/Header.css";

const HeaderComponent = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate("/auth");
    } catch (err) {
      console.error(err);
    }
  };

  const { Header } = Layout;

  useEffect(() => {
    if (!isLoading && categories) {
      setCategory(
        categories.categories.map((category) => {
          return {
            key: category.id,
            label: (
              <a
                href={`/category/${category.id}`}
                className="dropdown-content">
                {category.name}
              </a>
            ),
          };
        })
      );
    }
    if (userInfo) {
      if (!userInfo.user.username) {
        dispatch(logout());
      }
    }
  }, [userInfo, dispatch, isLoading, categories]);

  const items = [
    {
      key: "1",
      label: (
        <a
          href="/profile"
          className="dropdown-content">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          href="/admin"
          className="dropdown-content">
          Dashboard
        </a>
      ),
    },
    {
      key: "3",
      label: <a>Logout</a>,
      onClick: logoutHandler,
    },
  ];

  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderBottom: "2px solid #F5F5F5",
            height: "100px",
            padding: "0 70px",
            gap: "16px",
          }}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Dropdown
              menu={{
                items: category,
              }}
              className="menu-user"
              overlayStyle={{
                width: "150px",
              }}>
              <div className="menu-login">
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <BookOutlined />
                    Kategori
                    <DownOutlined style={{ fontSize: "12px" }} />
                  </Space>
                </a>
              </div>
            </Dropdown>
          </Col>
          <Col span={8}>
            <div
              className="logo"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <a href="/">
                <img
                  src={img}
                  className="logo-image"
                />
              </a>
            </div>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "100px",
            }}>
            {userInfo ? (
              <Dropdown
                menu={{
                  items: userInfo.user?.role === "user" ? items.filter((item) => item.key != "2") : items,
                }}
                className="menu-user"
                overlayStyle={{
                  width: "150px",
                }}>
                <div className="menu-login">
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <UserOutlined />
                      {userInfo.user.username}
                      <DownOutlined style={{ fontSize: "12px" }} />
                    </Space>
                  </a>
                </div>
              </Dropdown>
            ) : (
              <>
                <div className="menu-register">
                  <Link to="/auth">Masuk</Link>
                </div>
              </>
            )}
          </Col>
        </Header>
      </Layout>
    </>
  );
};
export default HeaderComponent;
