import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import EwasteUpload from "./Components/EwasteUpload";
import Navbar from "./Components/Navbar";
import How from "../pages/How"
import Leaderboard from "../pages/Leaderboard ";
import PrivateRoute from "../src/utils/PrivateRoute";
import Store from "./Components/Store";
import Inbox from "../pages/Inbox";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/add-e-waste" element={<EwasteUpload />} />
        <Route path="/how-it-works" element={<How/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/inbox" element={<Inbox/>}/>

      </Routes>
    </Router>
  );
}

export default App;
