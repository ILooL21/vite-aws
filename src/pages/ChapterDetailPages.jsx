import { useParams } from "react-router-dom";
import { useGetChapterQuery } from "../slices/ChapterApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ChapterDetailPages.css";

const ChapterDetailPages = () => {
  const { id } = useParams();

  const { data: chapter, isLoading } = useGetChapterQuery(id);

  return (
    <>
      <Header />
      <div className="container-chapter-detail">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${chapter.data.chapter.video_url}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
            <h1>{chapter.data.chapter.name}</h1>
            <p>{chapter.data.chapter.description}</p>
            <h2>Latihan Soal</h2>
            {chapter.data.questions.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                }}>
                Belum Ada Latihan Soal
              </p>
            ) : (
              <ul>
                {chapter.data.questions.map((exercise, index) => (
                  <li key={index}>
                    <a href={`/question/${exercise.id}`}>{exercise.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ChapterDetailPages;
