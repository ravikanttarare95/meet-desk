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
        `${API_URL}/admin/bookings?date=${date ? { date } : {}}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data.data);
    } catch (error) {
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-violet-700">
        Admin Bookings Dashboard
      </h1>

      {/* Filter */}
      <div className="flex gap-4 items-end">
        <Input
          type="date"
          value={date}
          onInputChange={(e) => setDate(e.target.value)}
        />

        <Button
          btnVariant="primary"
          btnTitle="Filter"
          onBtnClick={fetchBookings}
        />
      </div>

      {/* Content */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="space-y-1">
              <p className="font-semibold text-gray-800">
                {booking.userName} ({booking.userEmail})
              </p>

              <p className="text-sm text-gray-600">
                {booking.date} • {booking.startTime} - {booking.endTime}
              </p>

              {booking.purpose && (
                <p className="text-sm text-gray-500">
                  Purpose: {booking.purpose}
                </p>
              )}

              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  booking.status === "cancelled"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            {booking.status === "confirmed" && (
              <Button
                btnVariant="secondary"
                btnTitle="Cancel"
                onBtnClick={() => cancelBooking(booking._id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookings;
