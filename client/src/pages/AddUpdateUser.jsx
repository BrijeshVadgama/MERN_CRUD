import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddUpdateUser = () => {
  const { id } = useParams();
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);

  // Fetch user data if updating
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${backendURL}/api/users/${id}`)
        .then((response) => {
          setUserData(response.data.data); // Ensure response matches state keys
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch user data.",
          });
          setLoading(false);
        });
    } else {
      setUserData({
        name: "",
        email: "",
        mobileno: "",
        username: "",
        password: "",
      });
    }
  }, [id, backendURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiEndPoint = id
        ? `${backendURL}/api/users/${id}`
        : `${backendURL}/api/users`;
      const method = id ? "PUT" : "POST";

      const response = await axios({
        method,
        url: apiEndPoint,
        data: userData,
      });

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: id
            ? "User updated successfully!!"
            : "User created successfully!!",
        });
        navigate("/users");
      }
    } catch (error) {
      // Check if the error response exists
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";

        // Handle specific HTTP status codes
        if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Try Again",
            text: "Email already exists!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        }
      } else {
        // Handle network or unexpected errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const inputField = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter Your name",
      id: "name",
      name: "name",
      required: true,
      autofocus: true,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter Your email",
      id: "email",
      name: "email",
      required: true,
    },
    {
      label: "Mobile No",
      type: "number",
      placeholder: "Enter Your mobile no",
      id: "mobileno",
      name: "mobileno",
      required: true,
    },
    {
      label: "Username",
      type: "text",
      placeholder: "Enter username",
      id: "username",
      name: "username",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      placeholder: id
        ? "Leave blank if you don't want to change"
        : "Enter password",
      id: "password",
      name: "password",
      required: !id,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return null; // Don't render until userData is initialized
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {id ? "Update User" : "Add User"}
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          {inputField.map((field, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 mb-1 font-medium"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                id={field.id}
                required={field.name !== "password" || !id}
                autoFocus={field.autofocus}
                value={
                  field.name === "password" ? "" : userData[field.name] || ""
                }
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateUser;
