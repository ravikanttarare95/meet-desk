const generateSlots = (startTime, endTime, duration) => {
  const slots = [];

  let [startHour, startMinute] = startTime.split(":").map(Number);
  let [endHour, endMinute] = endTime.split(":").map(Number);

  let start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  while (start + duration <= end) {
    const slotStartHour = String(Math.floor(start / 60)).padStart(2, "0");
    const slotStartMinute = String(start % 60).padStart(2, "0");

    const slotEnd = start + duration;
    const slotEndHour = String(Math.floor(slotEnd / 60)).padStart(2, "0");
    const slotEndMinute = String(slotEnd % 60).padStart(2, "0");

    slots.push({
      start: `${slotStartHour}:${slotStartMinute}`,
      end: `${slotEndHour}:${slotEndMinute}`,
    });

    start += duration;
  }

  return slots;
};
export default generateSlots;
