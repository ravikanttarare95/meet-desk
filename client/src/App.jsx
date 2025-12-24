import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./views/Authentication.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { Toaster } from "react-hot-toast";
import Book from "./views/Booking.jsx";
import AdminBookings from "./views/AdminBookings.jsx";
import AdminAvailability from "./views/AdminAvailability.jsx";
import Home from "./views/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFound from "./views/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authentication />} />{" "}
        <Route path="/book/:userId" element={<Book />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/availability"
          element={
            <ProtectedRoute>
              <AdminAvailability />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/calendar"
          element={<ProtectedRoute>{/* <AdminCalendar /> */}</ProtectedRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
