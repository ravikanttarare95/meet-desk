import express from "express";
import jwtCheck from "./../middlewares/jwtCheck.js";
import {
  createAvailability,
  getAvailability,
  deleteAvailability,
} from "./../controllers/availabilityControllers.js";

const router = express.Router();

router.post("/", jwtCheck, createAvailability);
router.get("/", getAvailability);
router.delete("/:id", jwtCheck, deleteAvailability);

export default router;
