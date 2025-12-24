import { Link } from "react-router";

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-6">
      <h1 className="text-3xl font-bold text-violet-700">Admin Dashboard</h1>

      <p className="text-gray-600">
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
  );
}

export default Dashboard;
