import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../slices/CategoryApiSlice";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarAdmin from "../components/admin/NavbarAdmin.jsx";

const ListCategoryPages = () => {
  const { data: categories, isLoading, refetch } = useGetCategoriesQuery();

  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const handleDeleteCategory = async (id) => {
    await deleteCategory({ id });
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <NavbarAdmin />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <h1>Categories</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            striped
            bordered
            hover>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>
                    <Button
                      style={{ marginInline: "20px" }}
                      variant="primary"
                      onClick={() => navigate(`/editcategory/${category.id}`)}>
                      Edit
                    </Button>
                    <Button
                      style={{ marginInline: "20px" }}
                      variant="secondary"
                      onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ListCategoryPages;
