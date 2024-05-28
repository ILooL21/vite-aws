import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { HomeOutlined } from "@ant-design/icons";
import "../../styles/NavbarAdmin.css";

const AdminPages = () => {
  return (
    <Navbar
      bg="light"
      expand="lg">
      <Navbar.Brand href="/">
        <HomeOutlined />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/listuser">
            User
          </Nav.Link>
          <NavDropdown
            title="Category"
            id="category-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to="/listcategory">
              View Categories
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/addcategory">
              Add Category
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Lesson"
            id="lesson-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to="/listlesson">
              View Lessons
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/addlesson">
              Add Lesson
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Chapter"
            id="chapter-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to="/listchapter">
              View Chapters
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/addchapter">
              Add Chapter
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Question"
            id="question-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to="/listquestion">
              View Questions
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/addquestion">
              Add Question
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminPages;
