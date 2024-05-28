import { useGetCategoriesQuery } from "../slices/CategoryApiSlice";
import { Breadcrumb } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ListCategory.css"; // Import file CSS

const CategoryListPages = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  return (
    <>
      <Header />
      <Breadcrumb
        style={{
          margin: "24px 0 0 250px",
        }}
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: "All Category",
          },
        ]}
      />
      <div className="container-list-category">
        <h1>List Kategori</h1>
        <ul className="list-category">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            categories.categories.map((category) => (
              <li key={category.id}>
                <a href={`/category/${category.id}`}>{category.name}</a>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default CategoryListPages;
