import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import collectionsRouter from "./routes/collectionsRoutes.js";
import setupSwaggerDocs from './config/swagger.js';
import recommendationsRouter from './routes/recommendationsRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

//Docs
setupSwaggerDocs(app);


//DB
await db.sequelize
    .authenticate()
    .then(() => console.log('Database connected!'))
    .catch((err) => {console.error('Error connecting to database:', err.message); process.exit(1)});


// Collections routes
app.use("/collections", collectionsRouter);

// Recommendations routes
app.use("/recommendations", recommendationsRouter);

//Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));