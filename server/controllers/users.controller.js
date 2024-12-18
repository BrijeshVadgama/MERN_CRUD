const UserModel = require("../models/users.model.js");
const bcrypt = require("bcrypt");

// get all users
const FetchAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found!" });
    }

    return res
      .status(201)
      .json({ message: "Users", TotalUsers: users.length, data: users });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while fetching users!!", error: error.message });
  }
};

// get single user
const FetchSignleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id });

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "Users not found!" });
    }

    return res.status(201).json({ message: "User", data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while fetching user!!", error: error.message });
  }
};

// create new user
const CreateNewUser = async (req, res) => {
  try {
    const { name, email, mobileno, username, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists! Try another Email!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      mobileno,
      username,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User Created Successfully!", data: user });
  } catch (error) {
    console.log(error.data.message);
  }
};

// update existing user
// const UpdateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User already exists! Try another Email!!" });
//     }

//     if (!user || user.length === 0) {
//       res.status(404).json({ message: "User not found!!" });
//     }

//     res
//       .status(201)
//       .json({ message: "User updated successfully!!", data: user });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, ...otherData } = req.body;

    // Check if the email is already in use by another user
    const existingUser = await UserModel.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists! Try another Email!!" });
    }

    // Update the user
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...otherData, email }, // Update with new data
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found!!" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully!!", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while updating user!!", error: error.message });
  }
};

// delete existing user
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete({ _id: id });

    if (!user || user.length === 0) {
      res.status(404).json({ message: "User not found!!" });
    }

    return res.status(201).json({ message: "User deleted successfully!!" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while deleting user!!", error: error.message });
  }
};

/// -- export controller

module.exports = {
  FetchAllUser,
  FetchSignleUser,
  CreateNewUser,
  UpdateUser,
  DeleteUser,
};
