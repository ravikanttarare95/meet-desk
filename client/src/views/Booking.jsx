import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Input from "./../components/form_components/Input.jsx";
import Button from "./../components/form_components/Button.jsx";
import toast from "react-hot-toast";

function Book() {
  const { userId } = useParams();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    purpose: "",
  });

  const getSlots = async () => {
    if (!date) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/slots`,
        {
          params: { userId, date },
        }
      );
      if (response) {
        setSlots(response.data);
      }
    } catch {
      toast.error("Failed to load slots");
    }
  };

  const bookSlot = async () => {
    if (!user.name || !user.email) {
      toast.error("Name and email required");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        userId,
        date,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        userName: user.name,
        userEmail: user.email,
        purpose: user.purpose,
      });

      toast.success("Booking confirmed");
      setDate("");
      setSelectedSlot(null);
      setUser({ name: "", email: "", purpose: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    getSlots();
  }, [date, userId]);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <Input
        type="date"
        value={date}
        onInputChange={(e) => setDate(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-2">
        {slots?.map((slot) => (
          <Button
            btnTitle={`${slot.start} - ${slot.end}`}
            btnVariant={"primary"}
            key={slot.start}
            onBtnClick={() => setSelectedSlot(slot)}
          />
        ))}
      </div>

      {selectedSlot && (
        <>
          <Input
            type="text"
            onInputChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <Input
            type="email"
            onInputChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Purpose"
            onInputChange={(e) => setUser({ ...user, purpose: e.target.value })}
          />

          <Button
            btnVariant={"primary"}
            btnTitle={"Confirm Booking"}
            onBtnClick={bookSlot}
          />
        </>
      )}
    </div>
  );
}

export default Book;
