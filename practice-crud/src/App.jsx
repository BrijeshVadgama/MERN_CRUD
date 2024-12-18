import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllUsers from "./pages/AllUsers";
import SingleUser from "./pages/SingleUser";
import AddUpdateUser from "./pages/AddUpdateUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/add-update-user" element={<AddUpdateUser />} />
        <Route path="/add-update-user/:id" element={<AddUpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
