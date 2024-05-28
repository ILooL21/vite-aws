import { useParams, useNavigate } from "react-router-dom";
import { useGetLessonQuery } from "../slices/LessonApiSlice";
import { Breadcrumb } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/LessonDetailPages.css";

const LessonDetailPages = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: lesson, isLoading } = useGetLessonQuery(id);

  return (
    <>
      <Header />
      <div className="container-lesson-detail">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Breadcrumb
              items={[
                {
                  title: <a href="/">Home</a>,
                },
                {
                  title: <a href="/category">All Category</a>,
                },
                {
                  title: <a href={`/category/${lesson?.data.lesson.category_id}`}>Category {lesson?.data.lesson.category_id}</a>,
                },
                {
                  title: lesson?.data.lesson.name,
                },
              ]}
            />
            <div className="lesson-detail">
              <h2>{lesson?.data.lesson.name}</h2>
              <p>{lesson?.data.lesson.description}</p>
              <h3>List Materi</h3>
              <table>
                <tbody>
                  {lesson.data.chapters.length !== 0 ? (
                    lesson?.data.chapters.map((chapter) => (
                      <tr key={chapter.id}>
                        <td className="title-chapter">{chapter.name}</td>
                        <td className="navigate-to-chapter">
                          <button onClick={() => navigate(`/chapter/${chapter.id}`)}>Mulai Belajar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p id="notfound">Belum ada materi yang tersedia</p>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LessonDetailPages;
