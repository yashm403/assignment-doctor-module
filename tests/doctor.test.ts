import 'reflect-metadata';
import { DoctorService } from '../src/services/Doctor.service';
import { UploadService } from '../src/services/Upload.service';
import DoctorModel from '../src/models/doctor.model';
import { Container } from 'typedi';

// Mock dependencies
jest.mock('../src/models/doctor.model');
jest.mock('../src/services/Upload.service');

describe('DoctorService', () => {
    let doctorService: DoctorService;
    let uploadServiceMock: jest.Mocked<UploadService>;

    beforeEach(() => {
        uploadServiceMock = new UploadService() as jest.Mocked<UploadService>;
        Container.set(UploadService, uploadServiceMock);
        doctorService = new DoctorService();

        jest.clearAllMocks();
    });

    describe('getAllDoctors', () => {
        it('should return all doctors', async () => {
            const mockDoctors = [{ name: 'Dr. John' }, { name: 'Dr. Smith' }];
            (DoctorModel.find as jest.Mock).mockResolvedValue(mockDoctors);

            const result = await doctorService.getAllDoctors();

            expect(DoctorModel.find).toHaveBeenCalled();
            expect(result).toEqual(mockDoctors);
        });
    });

    describe('addDoctor', () => {
        it('should add a doctor without photo', async () => {
            const doctorData = { name: 'Dr. Alice' } as any;
            const mockResponse = { insertedId: '123' };
            (DoctorModel.insertOne as jest.Mock).mockResolvedValue(mockResponse);

            const result = await doctorService.addDoctor(doctorData);

            expect(DoctorModel.insertOne).toHaveBeenCalledWith(doctorData);
            expect(result).toEqual(mockResponse);
        });

        it('should add a doctor with photo', async () => {
            const doctorData = { name: 'Dr. Bob' } as any;
            const mockFile = { filename: 'photo.jpg' } as Express.Multer.File;
            const mockResponse = { insertedId: '456' };

            uploadServiceMock.getPhotoPath.mockReturnValue('/uploads/photo.jpg');
            (DoctorModel.insertOne as jest.Mock).mockResolvedValue(mockResponse);

            const result = await doctorService.addDoctor(doctorData, mockFile);

            expect(uploadServiceMock.getPhotoPath).toHaveBeenCalledWith('photo.jpg');
            expect(DoctorModel.insertOne).toHaveBeenCalledWith({
                ...doctorData,
                photo: '/uploads/photo.jpg',
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('searchDoctors', () => {
        it('should search doctors using regex', async () => {
            const mockDoctors = [{ name: 'Dr. Alex' }];
            const mockLimit = jest.fn().mockResolvedValue(mockDoctors);
            const mockFind = jest.fn().mockReturnValue({ limit: mockLimit });

            (DoctorModel.find as jest.Mock).mockImplementation(mockFind);

            const query = 'alex';
            const result = await doctorService.searchDoctors(query);

            expect(mockFind).toHaveBeenCalled();
            expect(mockLimit).toHaveBeenCalledWith(10);
            expect(result).toEqual(mockDoctors);
        });
    });

    describe('deleteDoctor', () => {
        it('should delete doctor by id', async () => {
            const mockResponse = { deletedCount: 1 };
            (DoctorModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockResponse);

            const result = await doctorService.deleteDoctor('123');

            expect(DoctorModel.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockResponse);
        });
    });
});
