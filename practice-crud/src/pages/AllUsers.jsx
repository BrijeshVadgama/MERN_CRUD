import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const backendURL = "http://localhost:5000";

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const users = await axios.get(`${backendURL}/api/users`);
      setUsers(users.data.data);
    } catch (error) {
      console.log("error fetching users!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure want to delete record?"
      );
      if (confirmDelete) {
        await axios.delete(`${backendURL}/api/users/${id}`);
        setUsers((prevUser) => prevUser.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log("error while deleting user!", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/add-update-user")}>Add New</button>
      <br />
      <br />
      <table border="1">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>username</th>
          <th>mno</th>
          <th colSpan="3">action</th>
        </tr>
        {users.length !== 0 ? (
          users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.mobileno}</td>
              <td>
                <button onClick={() => navigate(`/users/${user._id}`)}>
                  view
                </button>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/add-update-user/${user._id}`)}
                >
                  edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user._id)}>delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <p>no users</p>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default AllUsers;
