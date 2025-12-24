import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./../components/form_components/Button.jsx";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/bookings/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>User</th>
            <th>Email</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-t">
              <td>{b.date}</td>
              <td>
                {b.startTime} – {b.endTime}
              </td>
              <td>{b.userName}</td>
              <td>{b.userEmail}</td>
              <td>{b.purpose || "-"}</td>
              <td>{b.status}</td>
              <td>
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
    </div>
  );
};

export default AdminBookings;
