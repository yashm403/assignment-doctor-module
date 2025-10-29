import express from 'express';
import Container from 'typedi';
import { DoctorService } from '../services/Doctor.service';
import {IDoctor} from "../models/doctor.model";

const router = express.Router();
const doctorService = Container.get(DoctorService);

router.get('/', async (_, res) => {
    const doctors = await doctorService.getAllDoctors();
    res.send(doctors);
});

router.get('/search', async (req, res) => {
    const q = (req.query.q as string) || '';
    const results = await doctorService.searchDoctors(q);
    res.send(results);
});

router.post('/add', async (req, res) => {
    const doctorDetails = req.body as IDoctor;
    const newDoctor = await doctorService.addDoctor(doctorDetails);
    res.send(newDoctor);
});

export default router;
