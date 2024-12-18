import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ViewUsers = () => {
  const { backendURL } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // FETCH ALL USERS
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error while fetching users!!");
    }
  };

  // FETCH SINGLE USER
  const handleView = async (id) => {
    navigate(`/user/${id}`);
  };

  // UPDATE USER
  const handleUpdate = async (id) => {
    navigate(`/add-update-user/${id}`);
  };

  // DELETE USER
  const handleDelete = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Are You Sure?",
        text: "You wan't able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmDelete.isConfirmed) {
        await axios.delete(`${backendURL}/api/users/${id}`);
        Swal.fire({
          title: "Deleted",
          toast: true,
          icon: "success",
          text: "User deleted successfully!!",
          position: "top-end",
          timer: 3000,
          showLoaderOnConfirm: true,
          showConfirmButton: false,
        });
        setUsers(users.filter((user) => user._id !== id));
      } else {
        Swal.fire({
          title: "Operation Cancelled",
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error while deleting user!!", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center mt-5">
        <span className="border-b-2 border-teal-500">View</span> Users
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Mobile No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-lg text-gray-500 py-4"
                >
                  No data found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.mobileno}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => handleUpdate(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 text-xs font-semibold rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleView(user._id)}
                      className="bg-green-500 text-white px-4 py-2 text-xs font-semibold rounded hover:bg-green-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-2 text-xs font-semibold rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
