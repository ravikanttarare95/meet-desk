import express from "express";
import jwtCheck from "./../middlewares/jwtCheck.js";
import {
  getAdminBookings,
  cancelBooking,
} from "./../controllers/adminControllers.js";

const router = express.Router();

router.get("/bookings", jwtCheck, getAdminBookings);
router.patch("/bookings/:id/cancel", jwtCheck, cancelBooking);

export default router;
