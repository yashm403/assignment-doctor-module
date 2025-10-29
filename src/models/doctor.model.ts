import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor {
    name: string;
    designation: string;
    specialities: string[];
    experience: number;
    photo?: string;
    about?: string;
    education?: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const doctorSchema = new Schema<IDoctor>(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        specialities: { type: [String], required: true },
        experience: { type: Number, required: true },
        photo: String,
        about: String,
        education: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IDoctor>("Doctor", doctorSchema);
