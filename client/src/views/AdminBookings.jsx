import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./../components/form_components/Button.jsx";
import toast from "react-hot-toast";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${id}/cancel`,
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
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Purpose</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.date}</td>
                <td className="p-2">
                  {b.startTime} – {b.endTime}
                </td>
                <td className="p-2">{b.userName}</td>
                <td className="p-2">{b.userEmail}</td>
                <td className="p-2">{b.purpose || "-"}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">
                  {b.status === "BOOKED" && (
                    <Button
                      btnTitle={"Cancel"}
                      btnVariant={"secondary"}
                      onBtnClick={() => cancelBooking(b._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AdminBookings;
