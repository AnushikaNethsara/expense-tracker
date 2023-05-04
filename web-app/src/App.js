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
import CategoryWiseReport from "./reports/CategoryWiseReport";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/profile" element={<Profile />} />\
        <Route exact path="/addexpense" element={<AddExpense />} />
        <Route exact path="/report" element={<CategoryWiseReport />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
