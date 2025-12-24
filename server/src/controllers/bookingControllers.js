import Availability from "./../models/Availability.js";
import Booking from "./../models/Booking.js";

const getAvailableSlots = async (req, res) => {
  try {
    const { adminId, date } = req.query;

    const availability = await Availability.findOne({
      adminId,
      date,
      isBlocked: false,
    });

    if (!availability) {
      return res.json([]);
    }

    const allSlots = generateSlots(
      availability.startTime,
      availability.endTime,
      availability.slotDuration
    );

    const bookings = await Booking.find({
      adminId,
      date,
      status: "BOOKED",
    });

    const availableSlots = allSlots.filter((slot) => {
      return !bookings.some(
        (booking) =>
          booking.startTime === slot.start && booking.endTime === slot.end
      );
    });

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createBooking = async (req, res) => {};
export { getAvailableSlots, createBooking };
