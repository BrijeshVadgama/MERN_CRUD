import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUpdateUser from "./pages/AddUpdateUser";
import ViewUsers from "./pages/ViewUsers";
import ViewSingleUser from "./pages/ViewSingleUser";
import Navbar from "./components/Navbar";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-update-user" element={<AddUpdateUser />} />
          <Route path="/add-update-user/:id" element={<AddUpdateUser />} />
          <Route path="/users" element={<ViewUsers />} />
          <Route path="/user/:id" element={<ViewSingleUser />} />
        </Routes>
      </AppContextProvider>
    </div>
  );
};

export default App;
