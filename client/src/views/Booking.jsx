import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Input from "./../components/form_components/Input.jsx";
import Button from "./../components/form_components/Button.jsx";
import toast from "react-hot-toast";
import H1 from "../components/H1.jsx";
import Navbar from "./../components/Navbar.jsx";
import Footer from "./../components/Footer.jsx";

const API_URL = import.meta.env.VITE_API_URL;
function Book() {
  const { userId } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    start: "",
    end: "",
    purpose: "",
  });

  const [availabilityList, setAvailabilityList] = useState([]);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/availability?userId=${userId}`
      );
      if (response?.data?.data) {
        setAvailabilityList(response?.data?.data);
      }
    } catch (error) {
      console.log("Failed to fetch availability");
    }
  };

  const bookSlot = async () => {
    if (!user.name || !user.email) {
      toast.error("Name and email required");
      return;
    }

    if (!user.date || !user.start || !user.end) {
      toast.error("Select a Slot");
      return;
    }

    try {
      await axios.post(`${API_URL}/bookings`, {
        userId,
        date: user.date,
        startTime: user.start,
        endTime: user.end,
        userName: user.name,
        userEmail: user.email,
        purpose: user.purpose,
      });

      toast.success("Booking confirmed");

      setUser({ name: "", email: "", purpose: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 space-y-8 pb-12">
        <H1 headingTitle={"Book an Appointment"} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Available Slots
          </h2>

          {availabilityList.length === 0 && (
            <div className="bg-gray-100 text-gray-500 p-4 rounded-lg text-center">
              No availability
            </div>
          )}

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {availabilityList.map((item) => {
              const isSelected =
                user.date === item.date &&
                user.start === item.startTime &&
                user.end === item.endTime;
              console.log(item);
              return (
                <div
                  key={item._id}
                  onClick={() =>
                    setUser((prev) => ({
                      ...prev,
                      date: item.date,
                      start: item.startTime,
                      end: item.endTime,
                    }))
                  }
                  className={`cursor-pointer p-2 rounded-xl border transition
                  ${
                    isSelected
                      ? "border-violet-600 bg-violet-50 shadow-md"
                      : "border-gray-400 bg-white hover:shadow"
                  }`}
                >
                  <p className="font-medium text-gray-900">{item.date}</p>
                  <p className="text-sm text-gray-600">
                    {item.startTime} – {item.endTime}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.slotDuration} minutes
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-400 rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Your Details</h2>

          <Input
            type="text"
            placeholder="Your Name"
            value={user.name}
            onInputChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={user.email}
            onInputChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <Input
            type="text"
            placeholder="Purpose of meeting (optional)"
            value={user.purpose}
            onInputChange={(e) => setUser({ ...user, purpose: e.target.value })}
          />

          <Button
            btnVariant="primary"
            btnTitle="Confirm Booking"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            onBtnClick={bookSlot}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Book;
