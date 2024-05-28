import Header from "../NavbarAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../slices/CategoryApiSlice";

const AddCategory = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [createCategory] = useCreateCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    await createCategory({ name });
    navigate("/listcategory");
  };

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <h1>Add Category</h1>
        <form>
          <div className="mb-3">
            <label
              htmlFor="categoryName"
              className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleAddCategory(e)}>
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
