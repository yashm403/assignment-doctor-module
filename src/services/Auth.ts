import { Service } from "typedi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import DoctorModel from "../models/doctor.model";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

@Service()
export class AuthService {
    async register(data: any) {
        const existing = await DoctorModel.findOne({ email: data.email });
        if (existing) return { error: "Email already exists" };

        const hashed = await bcrypt.hash(data.password, 10);
        const doctor = new DoctorModel({ ...data, password: hashed });
        await doctor.save();

        return { message: "Doctor registered successfully" };
    }

    async login(email: string, password: string) {
        const doctor = await DoctorModel.findOne({ email });
        if (!doctor) return { error: "Invalid credentials" };

        const valid = await bcrypt.compare(password, doctor.password);
        if (!valid) return { error: "Invalid credentials" };

        const token = jwt.sign({ id: doctor._id, email: doctor.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { token, doctor };
    }
}
