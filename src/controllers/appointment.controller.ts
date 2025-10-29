import { Request, Response } from "express";
import Appointment from "../models/appointment.model";

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getAppointments = async (_req: Request, res: Response): Promise<void> => {
    const appointments = await Appointment.find().populate("doctorId");
    res.json(appointments);
};
