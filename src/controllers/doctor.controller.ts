import { Request, Response } from "express";
import Doctor from "../models/doctor.model";

export const addDoctor = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctor = new Doctor({ ...req.body, photo: req.file?.filename });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getDoctors = async (_req: Request, res: Response): Promise<void> => {
    const doctors = await Doctor.find();
    res.json(doctors);
};
