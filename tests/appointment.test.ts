import 'reflect-metadata';
import { AppointmentService } from '../src/services/Appointments.service';
import AppointmentModel from '../src/models/appointment.model';

// Mock the AppointmentModel
jest.mock('../src/models/appointment.model');

describe('AppointmentService', () => {
    let appointmentService: AppointmentService;

    beforeEach(() => {
        appointmentService = new AppointmentService();
        jest.clearAllMocks();
    });

    describe('getAppointments', () => {
        it('should return all appointments with populated doctorId', async () => {
            const mockAppointments = [{ patient: 'John' }, { patient: 'Jane' }];
            const mockPopulate = jest.fn().mockResolvedValue(mockAppointments);
            const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });

            (AppointmentModel.find as jest.Mock).mockImplementation(mockFind);

            const result = await appointmentService.getAppointments();

            expect(AppointmentModel.find).toHaveBeenCalled();
            expect(mockPopulate).toHaveBeenCalledWith('doctorId');
            expect(result).toEqual(mockAppointments);
        });
    });

    describe('addAppointment', () => {
        it('should save a new appointment', async () => {
            const mockData = { patient: 'Mark', doctorId: '123' };
            const mockSave = jest.fn().mockResolvedValue({ ...mockData, _id: 'abc' });

            // Mock the AppointmentModel constructor
            (AppointmentModel as unknown as jest.Mock).mockImplementation(() => ({
                save: mockSave,
            }));

            const result = await appointmentService.addAppointment(mockData as any);

            expect(AppointmentModel).toHaveBeenCalledWith(mockData);
            expect(mockSave).toHaveBeenCalled();
            expect(result).toEqual({ ...mockData, _id: 'abc' });
        });
    });

    describe('getAppointmentsByDoctor', () => {
        it('should return appointments for a given doctorId', async () => {
            const doctorId = 'doc123';
            const mockAppointments = [{ patient: 'Ella', doctorId }];
            const mockPopulate = jest.fn().mockResolvedValue(mockAppointments);
            const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });

            (AppointmentModel.find as jest.Mock).mockImplementation(mockFind);

            const result = await appointmentService.getAppointmentsByDoctor(doctorId);

            expect(AppointmentModel.find).toHaveBeenCalledWith({ doctorId });
            expect(mockPopulate).toHaveBeenCalledWith('doctorId');
            expect(result).toEqual(mockAppointments);
        });
    });
});
