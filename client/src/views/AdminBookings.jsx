import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./../components/form_components/Button.jsx";
import Input from "./../components/form_components/Input.jsx";
import toast from "react-hot-toast";
import H3 from "./../components/H3.jsx";
import Label from "./../components/form_components/Label.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function AdminBookings() {
  const token = localStorage.getItem("token");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
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

      if (response?.data?.data) {
        setBookings(response.data.data);
      }
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
  }, [date]);

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-6">
          <H3 headingTitle={" Bookings Management"} />
        </div>

        <div className="bg-white rounded-xl border p-4 mb-6 flex flex-row gap-4 items-end">
          <div>
            <Label labelTitle={"Filter by date"} />
            <Input
              type="date"
              value={date}
              onInputChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-10">Loading bookings...</p>
        )}

        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            <span className="mx-auto mb-4 w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-2xl">
              📅
            </span>

            {date
              ? `  There are no bookings scheduled for ${new Intl.DateTimeFormat(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                ).format(new Date(date))}`
              : "You don’t have any bookings today."}
          </p>
        )}

        <div className="grid gap-4">
          {bookings.map((booking) => {
            const isCancelled = booking.status === "CANCELLED";

            return (
              <div
                key={booking._id}
                className="relative bg-white rounded-xl border hover:shadow-sm transition p-5 flex flex-row items-center justify-between gap-4"
              >
                <div className="space-y-1 ">
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

                <div className="absolute bottom-2 right-2 flex items-center gap-4">
                  {!isCancelled && (
                    <Button
                      btnVariant="secondary"
                      btnTitle="Cancel Booking"
                      size="sm"
                      customStyle="font-semibold!"
                      onBtnClick={() => cancelBooking(booking._id)}
                    />
                  )}
                </div>
                <span
                  className={`absolute top-2 border right-2 text-xs font-semibold px-3 py-1 rounded ${
                    isCancelled
                      ? "bg-gray-200 text-gray-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminBookings;
