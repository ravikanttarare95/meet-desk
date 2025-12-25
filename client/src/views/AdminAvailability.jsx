import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./../components/form_components/Input.jsx";
import Label from "./../components/form_components/Label.jsx";
import Button from "./../components/form_components/Button.jsx";
import { jwtDecode } from "jwt-decode";
import H3 from "./../components/H3.jsx";

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
    const decoded = jwtDecode(token);

    try {
      const response = await axios.get(
        `${API_URL}/availability?userId=${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.data) {
        setAvailabilityList(response?.data?.data);
      }
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

  const calculateEndTime = (startTime, slotDuration) => {
    if (!startTime || !slotDuration) return "";

    const timeParts = startTime.split(":");
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);

    const startTimeInMinutes = hours * 60 + minutes;

    const endTimeInMinutes = startTimeInMinutes + slotDuration;

    const endHours = Math.floor(endTimeInMinutes / 60);
    const endMinutes = endTimeInMinutes % 60;

    const formattedHours = String(endHours).padStart(2, "0");
    const formattedMinutes = String(endMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="max-w-3xl p-4 mx-auto pt-4 space-y-8 min-h-screen">
        <H3 headingTitle={"Admin Availability"} />

        <div className="bg-gray-50 border border-gray-400 p-6 rounded-xl space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Create Availability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label labelTitle={"Enter Date"} htmlFor={"input-date"} />
              <Input
                id={"input-date"}
                type="date"
                value={form.date}
                min={today}
                onInputChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
            </div>

            <div>
              <Label
                labelTitle={"Slot Duration (min)"}
                htmlFor={"input-slots"}
              />
              <Input
                id={"input-slots"}
                type="number"
                value={form.slotDuration}
                onInputChange={(e) => {
                  const slotDuration = Number(e.target.value);
                  const endTime = calculateEndTime(
                    form.startTime,
                    slotDuration
                  );

                  setForm({
                    ...form,
                    slotDuration,
                    endTime,
                  });
                }}
                placeholder="Slot duration (minutes)"
                min="5"
              />
            </div>

            <div>
              <Label labelTitle={"Start Time"} htmlFor={"start-time"} />
              <Input
                id={"start-time"}
                type="time"
                value={form.startTime}
                onInputChange={(e) => {
                  const startTime = e.target.value;
                  const endTime = calculateEndTime(
                    startTime,
                    form.slotDuration
                  );
                  setForm({ ...form, startTime, endTime });
                }}
              />
            </div>

            <div>
              <Label labelTitle={"End Time"} htmlFor={"end-time"} />
              <Input
                id={"end-time"}
                type="time"
                value={form.endTime}
                isDisabled={true}
              />
            </div>
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
    </>
  );
}

export default AdminAvailability;
