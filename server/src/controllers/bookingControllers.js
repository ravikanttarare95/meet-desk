import Availability from "./../models/Availability.js";
import Booking from "./../models/Booking.js";
import generateSlots from "./../utils/slotGenerator.js";

const getAvailableSlots = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({ message: "userId and date are required" });
    }

    const availability = await Availability.findOne({
      userId,
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
      userId,
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

const createBooking = async (req, res) => {
  try {
    const { userId, date, startTime, endTime, userName, userEmail, purpose } =
      req.body;

    if (!userId || !date || !startTime || !endTime || !userName || !userEmail) {
      return res.status(400).json({
        message: "Missing required booking fields",
      });
    }

    const availability = await Availability.findOne({
      userId,
      date,
      isBlocked: false,
    });

    if (!availability) {
      return res.status(404).json({
        message: "No availability for this date",
      });
    }

    const alreadyBooked = await Booking.findOne({
      userId,
      date,
      startTime,
      endTime,
      status: "BOOKED",
    });

    if (alreadyBooked) {
      return res.status(409).json({
        message: "This slot is already booked",
      });
    }

    // const slots = generateSlots(
    //   availability.startTime,
    //   availability.endTime,
    //   availability.slotDuration
    // );

    // const isValidSlot = slots.some(
    //   (slot) => slot.start === startTime && slot.end === endTime
    // );

    // if (!isValidSlot) {
    //   return res.status(400).json({ message: "Invalid slot" });
    // }

    const booking = await Booking.create({
      userId,
      date,
      startTime,
      endTime,
      userName,
      userEmail,
      purpose,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("createBooking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export { getAvailableSlots, createBooking };
