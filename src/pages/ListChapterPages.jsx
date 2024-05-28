import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/admin/NavbarAdmin.jsx";
import { useGetChaptersQuery, useDeleteChapterMutation } from "../slices/ChapterApiSlice";

const ListLessonPages = () => {
  const { data: chapters, isLoading, refetch } = useGetChaptersQuery();
  const navigate = useNavigate();
  const [deleteChapter] = useDeleteChapterMutation();

  const handleDeleteChapter = async (id) => {
    console.log(id);
    await deleteChapter({ id });
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "250px",
        }}>
        <h1>Chapters</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            striped
            bordered
            hover>
            <thead>
              <tr>
                <th
                  style={{
                    width: "100px",
                  }}>
                  Name
                </th>
                <th>Deskripsi</th>
                <th>Kode Video</th>
                <th
                  style={{
                    width: "90px",
                  }}>
                  Lesson ID
                </th>
                <th
                  style={{
                    width: "190px",
                  }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {chapters.chapters.map((chapter, index) => (
                <tr key={index}>
                  <td>{chapter.name}</td>
                  <td>{chapter.description}</td>
                  <td>{chapter.video_url}</td>
                  <td>{chapter.lesson_id}</td>
                  <td>
                    <button
                      style={{ marginInline: "20px" }}
                      className="btn btn-primary"
                      onClick={() => navigate(`/editchapter/${chapter.id}`)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteChapter(chapter.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ListLessonPages;
