import Booking from "./../models/Booking.js";

const getAdminBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId }).sort({
      date: 1,
      startTime: 1,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAdminBookings };
