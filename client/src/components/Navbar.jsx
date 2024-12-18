import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/add-update-user", label: "Add New" },
    { path: "/users", label: "Users" },
  ];

  return (
    <nav className="bg-white shadow-md p-3">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-black text-xl  mt-2 mb-2">CRUD</h1>
        <ul className="list-style-none flex justify-between mr-5">
          {navLinks.map((link, index) => (
            <li key={index} className="mr-5 mt-2 text-xl">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold underline"
                    : "text-gray-600 hover:underline transition-all hover:text-blue-500 "
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
