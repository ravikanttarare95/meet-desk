import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./../components/form_components/Input.jsx";
import Button from "./../components/form_components/Button.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function AdminAvailability() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    slotDuration: 30,
  });

  const [availabilityList, setAvailabilityList] = useState([]);

  const fetchAvailability = async () => {
    try {
      const res = await axios.get(`${API_URL}/availability`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAvailabilityList(res.data);
    } catch (error) {
      toast.error("Failed to fetch availability");
    }
  };

  const createAvailability = async () => {
    const { date, startTime, endTime, slotDuration } = form;

    if (!date || !startTime || !endTime || !slotDuration) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/availability`,
        {
          date,
          startTime,
          endTime,
          slotDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Availability created");
      setForm({
        date: "",
        startTime: "",
        endTime: "",
        slotDuration: 30,
      });

      fetchAvailability();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create availability"
      );
    }
  };

  const deleteAvailability = async (id) => {
    try {
      await axios.delete(`${API_URL}/availability/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Availability deleted");
      fetchAvailability();
    } catch (error) {
      toast.error("Failed to delete availability");
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="max-w-2xl mx-auto pt-12 space-y-8 min-h-screen">
      <h1 className="text-3xl font-bold text-violet-600">Admin Availability</h1>

      <div className="bg-gray-50 border border-gray-400 p-6 rounded-xl space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          Create Availability
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="date"
            value={form.date}
            onInputChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <Input
            type="number"
            value={form.slotDuration}
            onInputChange={(e) =>
              setForm({ ...form, slotDuration: Number(e.target.value) })
            }
            placeholder="Slot duration (minutes)"
            min="5"
          />

          <Input
            type="time"
            value={form.startTime}
            onInputChange={(e) =>
              setForm({ ...form, startTime: e.target.value })
            }
          />

          <Input
            type="time"
            value={form.endTime}
            onInputChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>

        <Button
          btnVariant={"primary"}
          btnTitle={"Create Availability"}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white"
          onBtnClick={createAvailability}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Your Availability
        </h2>

        {availabilityList.length === 0 && (
          <div className="bg-gray-100 text-gray-500 p-4 rounded-lg text-center">
            No availability created yet
          </div>
        )}

        {availabilityList.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-400 p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-medium text-gray-900">{item.date}</p>
              <p className="text-sm text-gray-600">
                {item.startTime} – {item.endTime} ({item.slotDuration} mins)
              </p>
            </div>

            <Button
              btnVariant={"secondary"}
              btnTitle={"Delete"}
              size="sm"
              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
              onBtnClick={() => deleteAvailability(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAvailability;
