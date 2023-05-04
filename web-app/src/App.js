import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "./pages/Profile";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />\
        <Route path="/addexpense" element={<AddExpense />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
