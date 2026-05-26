import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Initial/Header";
import Footer from "./Pages/Initial/Footer";
import Home from "./Pages/Initial/Home";
import Login from "./Pages/Login/Login";
import UserStorage from "./createContext/UserStorage";
import User from "./Pages/User/User";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Photo from "./Components/Photo/Photo";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="foto/:id" element={<Photo />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
