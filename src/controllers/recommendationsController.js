import db from "../models/index.js";
import { formatResponse, handleError } from "../helpers/response.js";

/**
 * Get all recommendations
 */
export const index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const {count, rows: recommendations} = await db.Recommendation.findAndCountAll({
            include: [
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "fname", "sname"],
                },
            ],
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });

        const totalPages = Math.ceil(count / limit);

        return formatResponse(res, 200, "Recommendations retrieved successfully", {
            totalItems: count,
            totalPages,
            currentPage: parseInt(page, 10),
            recommendations
        });
    } catch (error) {
        handleError(res, error);
    }
};