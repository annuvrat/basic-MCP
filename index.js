import express from "express";
import cors from "cors";



import fileRoutes from "./routes/fileRoute.js";

const app = express();

const port = 3300;
app.use(cors());
app.use(express.json());
app.use("/api/files", fileRoutes);

app.listen(port);
console.log('live');
