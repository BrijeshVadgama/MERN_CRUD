import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ViewSingleUser = () => {
  const { backendURL } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error while fetching user!!", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center mt-5">
        <span className="border-b-2 border-teal-500">
          User
        </span>{" "}
        Details
      </h1>
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{user.name}</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-600 mr-2">Email:</span>
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-600 mr-2">
                Mobile No.:
              </span>
              <span className="text-gray-700">{user.mobileno}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-600 mr-2">Username:</span>
              <span className="text-gray-700">{user.username}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleUser;
