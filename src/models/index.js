import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import config from '../config/config.js';  // Load the default Sequelize config

dotenv.config(); // Load environment variables

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);

const db = {};

// Get the environment-specific configuration
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];  // This gets the config based on the environment

// Initialize Sequelize with the config
let sequelize = new Sequelize(dbConfig.url, {...dbConfig, ssl: true});

// Read and load all model files dynamically
const modelFiles = fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && !file.includes('.test.js'));

const loadModels = async () => {
    for (const file of modelFiles) {
        try {
            const model = await import(path.join(__dirname, file));
            const modelInstance = model.default(sequelize, DataTypes);
            db[modelInstance.name] = modelInstance;
        } catch (error) {
            console.error(`Error loading model ${file}:`, error);
        }
    }
};

// Load models and setup associations after loading all models
await loadModels();

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;  // Ensure sequelize is added to db
db.Sequelize = Sequelize;

export default db;  // Export db object with sequelize
