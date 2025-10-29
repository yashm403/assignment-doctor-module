import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
    name: string;
    designation: string;
    specialities: string[];
    experience: number;
    photo?: string;
    about?: string;
    education?: string;
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
    },
    { timestamps: true }
);

export default mongoose.model<IDoctor>("Doctor", doctorSchema);
