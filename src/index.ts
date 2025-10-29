import express from "express";
import connectDB from "./config/db";

const app = express();

(async () => {
    await connectDB();

    app.listen(process.env.PORT, () => console.log("🚀 Server running"));
})();
