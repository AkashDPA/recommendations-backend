import db from "../models/index.js";
import { formatResponse, handleError } from "../helpers/response.js";

/**
 * Get all recommendations
 */
export const index = async (req, res) => {
    try {
        const recommendations = await db.Recommendation.findAll({
            include: [
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "fname", "sname"],
                },
            ],
        });
        return formatResponse(res, 200, "Recommendations retrieved successfully", recommendations);
    } catch (error) {
        handleError(res, error);
    }
};