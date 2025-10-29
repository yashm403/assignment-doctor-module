import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientName: string;
    date: string;
    time: string;
    status: string;
}

const appointmentSchema = new Schema<IAppointment>(
    {
        doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
        patientName: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        status: { type: String, default: "Pending" },
    },
    { timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
