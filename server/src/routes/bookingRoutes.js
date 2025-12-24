import express from "express";
import {
  getAvailableSlots,
  createBooking,
} from "./../controllers/bookingControllers.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/slots", getAvailableSlots);

export default router;
