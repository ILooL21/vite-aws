import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "../NavbarAdmin";
import { useGetCategoriesQuery, useUpdateCategoryMutation } from "../../../slices/CategoryApiSlice";

const EditCategory = () => {
  let { id } = useParams();
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  let { data: categories, isLoading, refetch } = useGetCategoriesQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCategory({ id, name: category });
    navigate("/listcategory");
  };

  useEffect(() => {
    if (categories) {
      const category = categories.categories.find((c) => c.id == id);
      setCategory(category.name);
    }
    refetch();
  }, [categories, id, refetch]);

  return (
    <>
      <Headers />
      <div
        className="container-edit-category"
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <div className="row">
          <div className="col-md-6">
            <h2>Edit Category</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={isLoading ? "Loading..." : category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  marginTop: "20px",
                }}>
                Update Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
