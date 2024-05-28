import { Row, Col } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const FooterComponent = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#87c0cd",
        width: "100%",
        position: "absolute",
        paddingTop: "40px",
      }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          marginInline: "60px",
        }}>
        <Col
          span={8}
          style={{
            justifyContent: "center",
            padding: "0 40px",
          }}>
          <h3
            style={{
              fontSize: "20px",
              color: "#000000",
            }}>
            Senku Academy
          </h3>
          <p
            style={{
              fontSize: "17px",
              color: "#000000",
            }}>
            Senku Academy adalah <strong>Website nonprofit</strong> yang bergerak di bidang pendidikan.
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#000000",
            }}>
            Misi kami adalah menyediakan pendidikan berkualitas dunia secara gratis kepada siapa pun, di mana pun.
          </p>
        </Col>
        <Col
          span={8}
          style={{
            padding: "0 40px",
            paddingLeft: "150px",
          }}>
          <h3
            style={{
              fontSize: "20px",
              color: "#000000",
            }}>
            Contact Us
          </h3>
          <p
            style={{
              fontSize: "17px",
              color: "#000000",
            }}>
            <EnvironmentOutlined />
            <i> </i>
            Kabupaten Gresik, Jawa Timur
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#000000",
            }}>
            <MailOutlined />
            <i> </i>
            senkuacademy@senku.ac.id
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "#000000",
            }}>
            <PhoneOutlined />
            +62-123-456-789
          </p>
        </Col>
        <Col
          span={8}
          style={{
            paddingLeft: "150px",
            padding: "0 40px",
          }}>
          <h3 style={{ fontSize: "20px", color: "#000000" }}>Follow Us</h3>
          <p>
            <a
              href="https://www.facebook.com/profile.php?id=100009379517600"
              style={{ fontSize: "17px", color: "#000000", textDecoration: "none" }}>
              Facebook
            </a>
          </p>
          <p>
            <a
              href="https://www.instagram.com/mkrilul/"
              style={{ fontSize: "17px", color: "#000000", textDecoration: "none" }}>
              Instagram
            </a>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/in/muhammad-kholilur-rohman-3450371a2/"
              style={{ fontSize: "17px", color: "#000000", textDecoration: "none" }}>
              linkedIn
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <p style={{ textAlign: "center", fontSize: "18px", color: "#000000" }}>
            © 2024 <strong>Senku Academy</strong>. All rights reserved.
          </p>
        </Col>
      </Row>
    </footer>
  );
};
export default FooterComponent;
