import { useGetAllUsersQuery, useChangeUserRolesMutation } from "../slices/userApiSlice";
import { Table, Button } from "react-bootstrap";
import NavbarAdmin from "../components/admin/NavbarAdmin.jsx";

const ListUserPages = () => {
  const { data: users, isLoading, refetch } = useGetAllUsersQuery();
  const [changeUserRoles] = useChangeUserRolesMutation();

  const handleChangeRole = async (email) => {
    await changeUserRoles({ email });
    refetch();
  };

  return (
    <>
      <NavbarAdmin />
      <div
        className="list-user-pages"
        style={{
          paddingInline: "200px",
        }}>
        <h1 className="my-4">Users</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            striped
            bordered
            hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "user" ? (
                      <Button
                        variant="primary"
                        onClick={() => handleChangeRole(user.email)}>
                        Change to Admin
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleChangeRole(user.email)}>
                        Change to User
                      </Button>
                    )}
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

export default ListUserPages;
