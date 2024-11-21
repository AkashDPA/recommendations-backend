/**
 * Read the csv from src/data & insert into tables
 */
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", (err) => reject(err));
    });
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await readCSV(path.resolve(__dirname, '../data/users.csv'));
        await queryInterface.bulkInsert("users", users);

        const recommendations = await readCSV(path.resolve(__dirname, '../data/recommendations.csv'));
        await queryInterface.bulkInsert("recommendations", recommendations);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("recommendations", null, {});
        await queryInterface.bulkDelete("users", null, {});
    },
};
