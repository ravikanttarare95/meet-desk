import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./views/Authentication.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import Book from "./views/Booking.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authenticate" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<Book />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
