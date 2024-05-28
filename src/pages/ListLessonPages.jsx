import { useEffect } from "react";
import { useGetLessonsQuery, useDeleteLessonMutation } from "../slices/LessonApiSlice";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Header from "../components/admin/NavbarAdmin.jsx";

const ListLessonPages = () => {
  const { data: lessons, isLoading, refetch } = useGetLessonsQuery();

  const navigate = useNavigate();

  const [deleteLesson] = useDeleteLessonMutation();

  const handleDeleteLesson = async (id) => {
    await deleteLesson({ id });
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
          paddingInline: "300px",
        }}>
        <h1>Lessons</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            striped
            bordered
            hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.lessons.map((lesson, index) => (
                <tr key={index}>
                  <td>{lesson.name}</td>
                  <td>{lesson.description}</td>
                  <td>{lesson.category_id}</td>
                  <td>
                    <button
                      style={{ marginInline: "20px" }}
                      className="btn btn-primary"
                      onClick={() => navigate(`/editlesson/${lesson.id}`)}>
                      Edit
                    </button>
                    <button
                      style={{ marginInline: "20px" }}
                      className="btn btn-secondary"
                      onClick={() => handleDeleteLesson(lesson.id)}>
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
