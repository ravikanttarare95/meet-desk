import express from "express";
import jwtCheck from "./../middlewares/jwtCheck.js";
import { getAdminBookings } from "./../controllers/adminControllers.js";

const router = express.Router();

router.get("/bookings", jwtCheck, getAdminBookings);

export default router;
