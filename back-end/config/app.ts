import cors from 'cors';
import express from "express";
import router from "../routes/api";

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/tasks", router);

    return app;
}