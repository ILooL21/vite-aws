import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Breadcrumb } from "antd";
import { useGetCategoryQuery } from "../slices/CategoryApiSlice";
import "../styles/CategoryDetailPages.css";

const CategoryDetailPages = () => {
  let { id } = useParams();

  const { data: category, isLoading } = useGetCategoryQuery(id);

  const navigate = useNavigate();

  return (
    <>
      <Header />
      {isLoading ? null : (
        <Breadcrumb
          style={{
            margin: "24px 0 0 250px",
          }}
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href="/category">All Category</a>,
            },
            {
              title: `Category ${id}`,
            },
          ]}
        />
      )}
      <div className="container-lesson-list">
        <h1>List Kelas</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {category.lessons.length !== 0 ? (
              category.lessons.map((lesson) => (
                <div
                  className="lesson-item"
                  key={lesson.id}>
                  <h2>{lesson.name}</h2>
                  <p>{lesson.description}</p>
                  <button onClick={() => navigate(`/lesson/${lesson.id}`)}>Lihat Materi</button>
                </div>
              ))
            ) : (
              <p>Tidak Ada Kelas Tersedia</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryDetailPages;
