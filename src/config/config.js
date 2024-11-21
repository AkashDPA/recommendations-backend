import dotenv from "dotenv";
dotenv.config();

export default {
    development: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        sync: false,
    },
    test: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        sync: false,
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        sync: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,  // Allows self-signed certificates
            },
        },
    },
};
