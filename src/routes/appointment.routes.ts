import express from 'express';
import Container from 'typedi';
import { AppointmentService } from '../services/Appointments.service';

const router = express.Router();
const appointmentService = Container.get(AppointmentService);

router.get('/', async (_, res) => {
    const appointments = await appointmentService.getAppointments();
    res.send(appointments);
});

router.post('/create', async (req, res) => {
    const newAppointment = await appointmentService.addAppointment(req.body);
    res.send(newAppointment);
});

router.get('/doctor/:id', async (req, res) => {
    const doctorAppointments = await appointmentService.getAppointmentsByDoctor(req.params.id);
    res.send(doctorAppointments);
});

export default router;
