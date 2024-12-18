import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddUpdateUser = () => {
  const backednURL = "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // FETCH USER data

  useEffect(() => {
    if (id) {
      axios
        .get(`${backednURL}/api/users/${id}`)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((error) => {
          console.log("Error fetching user details!!!", error);
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
  }, [id]);

  // CHANGE INPUT

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // SUBMIT DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiEndPoints = id
        ? `${backednURL}/api/users/${id}`
        : `${backednURL}/api/users`;

      const method = id ? "PUT" : "POST";

      const response = await axios({
        method,
        url: apiEndPoints,
        data: userData,
      });

      if (response.status === 201 || response.status === 200) {
        window.alert(id ? "User Updated" : "User Created");
        navigate("/users");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert(
          error.response.data.message || "email exists try another!!"
        );
      } else {
        console.log("Error", error);
        window.alert("something went wrong!!");
      }
    }
  };

  const inputField = [
    {
      type: "text",
      placeholder: "name",
      name: "name",
      id: "name",
      required: true,
      autofocus: true,
    },
    {
      type: "text",
      placeholder: "email",
      name: "email",
      id: "email",
      required: true,
    },
    {
      type: "text",
      placeholder: "mobileno",
      name: "mobileno",
      id: "mobileno",
      required: true,
    },
    {
      type: "text",
      placeholder: "username",
      name: "username",
      id: "username",
      required: true,
    },
    {
      type: "text",
      placeholder: "password",
      name: "password",
      id: "password",
      required: !id,
    },
  ];

  return (
    <div>
      {userData ? (
        <form onSubmit={handleSubmit}>
          {inputField.map((field) => (
            <div key={field.id}>
              <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                id={field.id}
                onChange={handleChange}
                value={
                  field.name === "password" && id
                    ? ""
                    : userData[field.name] || ""
                }
                required={field.name !== "password" || !id}
                autoFocus={field.autofocus}
              />
              <br />
              <br />
            </div>
          ))}

          <button type="submit">{id ? "Update" : "Add"}</button>
        </form>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default AddUpdateUser;
