import express from 'express';
import "dotenv/config";
import cors from 'cors';
import authRouters from './src/routes/authRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js'

import { connectDB } from './src/lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use("/api/auth", authRouters);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

