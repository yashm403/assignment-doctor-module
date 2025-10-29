import Container, {Service} from 'typedi';
import DoctorModel, {IDoctor} from '../models/doctor.model';
import {UploadService} from './Upload.service';

@Service()
export class DoctorService {
    private uploadService = Container.get(UploadService);

    async getAllDoctors() {
        return DoctorModel.find();
    }

    async addDoctor(data: IDoctor, file?: Express.Multer.File) {
        const doctorData = {...data};

        if (file) {
            doctorData.photo = this.uploadService.getPhotoPath(file.filename);
        }

        return DoctorModel.insertOne(doctorData);
    }

    async searchDoctors(query: string) {
        const regex = new RegExp(query, 'i'); // case-insensitive
        return DoctorModel.find({
            $or: [
                { name: regex },
                { designation: regex },
                { specialities: { $elemMatch: { $regex: regex } } },
            ],
        }).limit(10); // optional limit
    }

    async deleteDoctor(id: string) {
        return await DoctorModel.findByIdAndDelete(id);
    }
}
