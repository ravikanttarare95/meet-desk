import Booking from "./../models/Booking.js";
/**
 * GET /admin/bookings?date=YYYY-MM-DD
 * Admin only
 */
const getAdminBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    const bookings = await Booking.find({ userId, date }).sort({
      date: 1,
      startTime: 1,
    });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("getAdminBookings error:", error);
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
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    console.error("cancelBooking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getAdminBookings, cancelBooking };
