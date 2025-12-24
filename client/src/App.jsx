import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./views/Authentication.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import Book from "./views/Booking.jsx";
import AdminBookings from "./views/AdminBookings.jsx";
import Home from "./views/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authentication />} />
        <Route path="/dashboard" element={<AdminBookings />} />
        <Route path="/book/:userId" element={<Book />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
