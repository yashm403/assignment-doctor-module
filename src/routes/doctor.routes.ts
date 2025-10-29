import express from "express";
import { addDoctor, getDoctors } from "../controllers/doctor.controller";
import upload from "../middlewares/upload";

const router = express.Router();

router.post("/", upload.single("photo"), addDoctor);
router.get("/", getDoctors);

export default router;
