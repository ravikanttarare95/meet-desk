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
  const { userId } = req.query;

  try {
    const availability = await Availability.find({ userId }).sort({ date: 1 });
    if (availability) {
      return res.json({
        success: true,
        data: availability,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const availabilityId = req.params.id;

    const deletedAvailability = await Availability.findOneAndDelete({
      _id: availabilityId,
      userId,
    });

    if (!deletedAvailability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found or already deleted",
      });
    }

    return res.json({
      success: true,
      message: "Availability deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createAvailability, getAvailability, deleteAvailability };
