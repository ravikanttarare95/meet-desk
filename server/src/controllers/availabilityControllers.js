import Availability from "./../models/Availability.js";

const createAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime, slotDuration } = req.body;
    const userId = req.user.id;

    if (!date || !startTime || !endTime || !slotDuration) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Availability.findOne({
      userId,
      date,
    });

    if (exists) {
      return res.status(409).json({
        message: "Availability already exists for this date",
      });
    }

    const availability = await Availability.create({
      userId,
      date,
      startTime,
      endTime,
      slotDuration,
    });

    res.status(201).json({
      success: true,
      availability,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAvailability = async (req, res) => {
  const userId = req.user.id;
  const availability = await Availability.find({ userId });
  res.json(availability);
};

const deleteAvailability = async (req, res) => {};

export { createAvailability, getAvailability, deleteAvailability };
