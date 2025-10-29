import { Service } from 'typedi';
import AppointmentModel, {IAppointment} from '../models/appointment.model';

@Service()
export class AppointmentService {
    async getAppointments() {
        return AppointmentModel.find().populate('doctorId');
    }

    async addAppointment(data: IAppointment) {
        const appointment = new AppointmentModel(data);
        return await appointment.save();
    }

    async getAppointmentsByDoctor(doctorId: string) {
        return AppointmentModel.find({ doctorId }).populate('doctorId');
    }
}
