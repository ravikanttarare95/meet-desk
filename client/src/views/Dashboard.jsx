import { Link } from "react-router";
import Navbar from "./../components/Navbar.jsx";
import Footer from "./../components/Footer.jsx";
import H1 from "./../components/H1.jsx";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl p-4 mx-auto ">
        <H1 headingTitle={"Admin Dashboard"} />

        <p className="text-gray-600 mt-1 mb-6">
          Manage your availability, bookings, and calendar from here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/admin/availability"
            className="border rounded-lg p-6 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg text-red-600">Availability</h2>
            <p className="text-sm text-gray-500 mt-2">
              Define your working slots
            </p>
          </Link>

          <Link
            to="/admin/bookings"
            className="border rounded-lg p-6 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg text-violet-600">Bookings</h2>
            <p className="text-sm text-gray-500 mt-2">
              View & manage appointments
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
