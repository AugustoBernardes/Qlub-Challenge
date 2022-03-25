import { router } from "./routes"
import express from "express";
import dotenv from 'dotenv'

import cors from 'cors';
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT

app.listen(PORT, () => { 
    console.log(`🚀 Server is running on PORT:${PORT}`)
})