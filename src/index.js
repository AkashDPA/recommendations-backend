import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';  // Adjusted to match ES6 import

import setupSwaggerDocs from './config/swagger.js';

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


//Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));