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

const cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      userId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAdminBookings, cancelBooking };
