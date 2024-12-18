import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const backendURL = "http://localhost:5000";
  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${backendURL}/api/users/${id}`);
      setUser(user.data.data);
    } catch (error) {
      console.log("error fetching user!", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div>
      <table border="1">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>username</th>
          <th>mno</th>
        </tr>
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.mobileno}</td>
        </tr>
      </table>
    </div>
  );
};

export default SingleUser;
