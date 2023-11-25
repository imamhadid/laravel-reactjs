import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get<{ users: User[] }>(
        "http://localhost:8000/api/v1/users"
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post<User>(
        "http://localhost:8000/api/v1/users",
        newUser
      );
      setUsers([...users, response.data]);

      setNewUser({ name: "", email: "", password: "" });
      fetchData();
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please check your inputs and try again.");
    }
  };

  const handleUpdateUser = async (
    id: number,
    updatedUserData: Partial<User>
  ) => {
    try {
      const response = await axios.put<User>(
        `http://localhost:8000/api/v1/users/${id}`,
        updatedUserData
      );
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please check your inputs and try again.");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again later.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof newUser
  ) => {
    setNewUser({ ...newUser, [key]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCreateUser();
  };

  return (
    <div className="user-table-container">
      <h2>User Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    handleUpdateUser(user.id, { name: "Updated Name" })
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={newUser.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={newUser.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={newUser.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserTable;
