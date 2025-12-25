import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./../components/form_components/Button.jsx";
import Input from "./../components/form_components/Input.jsx";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function AdminBookings() {
  const token = localStorage.getItem("token");

  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/admin/bookings${date ? `?date=${date}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(response.data.data);
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/admin/bookings/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Booking cancelled");
      fetchBookings();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-violet-700">
          Bookings Management
        </h1>
        <p className="text-gray-500 text-sm">
          View and manage all appointment bookings
        </p>
      </div>

      <div className="bg-white rounded-xl border p-4 mb-6 flex flex-col sm:flex-row gap-4 items-end">
        <div>
          <label className="text-sm font-medium text-gray-600">
            Filter by date
          </label>
          <Input
            type="date"
            value={date}
            onInputChange={(e) => setDate(e.target.value)}
          />
        </div>

        <Button
          btnVariant="primary"
          btnTitle="Apply Filter"
          onBtnClick={fetchBookings}
        />
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading bookings...</p>
      )}

      {!loading && bookings.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No bookings found</p>
      )}

      <div className="grid gap-4">
        {bookings.map((booking) => {
          const isCancelled = booking.status === "CANCELLED";

          return (
            <div
              key={booking._id}
              className="bg-white rounded-xl border hover:shadow-sm transition p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-800">
                  {booking.userName}
                </p>

                <p className="text-sm text-gray-600">{booking.userEmail}</p>

                <p className="text-sm text-gray-700">
                  {booking.date} •{" "}
                  <span className="font-medium">
                    {booking.startTime} – {booking.endTime}
                  </span>
                </p>

                {booking.purpose && (
                  <p className="text-sm text-gray-500">
                    Purpose: {booking.purpose}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isCancelled
                      ? "bg-gray-200 text-gray-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {booking.status}
                </span>

                {!isCancelled && (
                  <Button
                    btnVariant="secondary"
                    btnTitle="Cancel"
                    onBtnClick={() => cancelBooking(booking._id)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminBookings;
