import { Flex, Row, Col } from "antd";
import { useSelector } from "react-redux";
import img from "../assets/learn.png";
import senku from "../assets/senku.jpg";
import belajar from "../assets/belajar.jpg";
import sekolah from "../assets/sekolah.jpg";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div
        style={{
          margin: "0px",
        }}>
        <Flex
          gap="middle"
          wrap="wrap"
          justify="center"
          style={{
            paddingInline: 225,
          }}>
          <Row
            style={{
              margin: "20px 0",
            }}>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <img
                src={img}
                style={{ width: "320px", height: "320px" }}
              />
            </Col>
            <Col
              span={12}
              style={{
                padding: "0 40px",
              }}>
              <Row>
                <h1>“Dalam sains, semuanya setara”</h1>
              </Row>
              <Row
                style={{
                  margin: "20px 0",
                  fontSize: "20px",
                }}>
                <p>Kami bertekad untuk memajukan pemikiran melalui pendidikan berkualitas yang dapat diakses dengan mudah di seluruh dunia.</p>
              </Row>
              <Row
                style={{
                  margin: "40px 0",
                }}>
                {userInfo ? (
                  <button
                    style={{
                      background: "#87c0cd",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "8px 16px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}>
                    <a
                      href="/category"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "17px",
                        display: "block",
                        width: "100%",
                      }}>
                      All Courses
                    </a>
                  </button>
                ) : (
                  <button
                    style={{
                      background: "#87c0cd",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "8px 16px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}>
                    <a
                      href="/auth"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "17px",
                        display: "block",
                        width: "100%",
                      }}>
                      Coba Gratis
                    </a>
                  </button>
                )}
              </Row>
            </Col>
          </Row>
        </Flex>
      </div>
      <div>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
          }}>
          <h4>Mengapa Senku Academy Efektif?</h4>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            src={belajar}
            style={{
              width: "300px",
              height: "220px",
            }}
          />
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "20px",
            fontFamily: "Lato",
            paddingInline: 400,
          }}>
          <p>
            Senku Academy efektif karena pendekatannya yang terpersonalisasi dalam pembelajaran, memungkinkan siswa untuk belajar sesuai dengan ritme mereka sendiri sambil mengisi celah dalam pemahaman mereka, yang kemudian mempercepat
            proses pembelajaran mereka. Kontennya yang terpercaya, dikembangkan oleh para ahli, mencakup berbagai subjek dari matematika hingga ilmu pengetahuan, dan tersedia secara gratis untuk para pembelajar dan guru. Selain itu, Senku
            Academy menyediakan alat yang memungkinkan guru untuk mengidentifikasi kebutuhan individual siswa dan menyajikan instruksi yang disesuaikan, memungkinkan mereka untuk memenuhi kebutuhan pendidikan setiap siswa dengan lebih
            efektif.
          </p>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Col span={16}>
          <blockquote
            style={{
              fontSize: "30px",
              padding: "20px 0",
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}>
            &quot;Tidak ada yang tidak dapat Anda lakukan jika Anda mencobanya.&quot;
            <p
              style={{
                fontSize: "20px",
                textAlign: "right",
              }}>
              <cite>Senku Ishigami</cite>
            </p>
            <p
              style={{
                fontSize: "20px",
                textAlign: "right",
              }}>
              <strong>Dr. Stone</strong>
            </p>
          </blockquote>
        </Col>
        <Col span={2}>
          <img
            src={senku}
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              padding: "20px",
            }}
          />
        </Col>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 250,
          marginBottom: "40px",
        }}>
        <Row>
          <Col span={12}>
            <img
              src={sekolah}
              style={{
                width: "420px",
                height: "320px",
              }}
            />
          </Col>
          <Col span={12}>
            <h3>Setiap anak pantas mendapatkan kesempatan untuk belajar.</h3>
            <h2>BERSAMA KITA BISA BERBUAT BERBEDA</h2>
            <p>
              Di seluruh dunia, 617 juta anak kehilangan kemampuan dasar dalam matematika dan membaca. Kami adalah website nonprofit yang memberikan pendidikan yang mereka butuhkan, dan kami membutuhkan bantuan Anda. Anda dapat mengubah
              arah hidup seorang anak.
            </p>
            <button
              style={{
                background: "#87c0cd",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                marginTop: "40px",
                padding: "8px 16px 8px 16px",
                fontWeight: "bold",
                fontSize: "20px",
              }}>
              <a
                href="https://kitabisa.com/campaign/bantupendidikananaknelayanmiskin02/story"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "17px",
                }}>
                Donasi Sekarang
              </a>
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Hero;
