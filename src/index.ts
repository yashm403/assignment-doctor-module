import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import doctorRoutes from "./routes/doctor.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

(async () => {
    await connectDB();

    app.use(cors());
    app.use(express.json());
    app.use("/uploads", express.static("uploads"));

    app.use("/api/doctors", doctorRoutes);
    app.use("/api/appointments", appointmentRoutes);

    app.listen(process.env.PORT, () => console.log("🚀 Server running"));
})();
