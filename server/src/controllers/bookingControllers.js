import Availability from "./../models/Availability.js";
import Booking from "./../models/Booking.js";

const createBooking = async (req, res) => {
  try {
    const { userId, date, startTime, endTime, userName, userEmail, purpose } =
      req.body;

    if (!userId || !date || !startTime || !endTime || !userName || !userEmail) {
      return res.status(400).json({
        message: "Missing required booking fields",
      });
    }

    const userNameRegex = /^[A-Z][a-zA-Z'-]{1,49}(?: [A-Z][a-zA-Z'-]{1,49})*$/;

    const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userNameRegex.test(userName)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter your full name using only letters, spaces, apostrophes, or hyphens, with each name starting with a capital letter and between 2 and 50 characters long",
      });
    }

    if (!userEmailRegex.test(userEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address (user@xyz.com)",
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
export { createBooking };
