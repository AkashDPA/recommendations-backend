import db from "../models/index.js";
import { formatResponse, handleError } from "../helpers/response.js";

/**
 * Get all collections
 */
export const index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const collections = await db.Collection.findAll({
            include: [
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "fname", "sname"],
                },
                {
                    model: db.Recommendation,
                    as: "recommendations",
                    attributes: ["id", "title", "category"],
                },
            ],
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
        });
        return formatResponse(res, 200, "Collections retrieved successfully", collections);
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Get a single collection by ID
 */
export const show = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await db.Collection.findByPk(id, {
            include: [
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "fname", "sname"],
                },
                {
                    model: db.Recommendation,
                    as: "recommendations",
                },
            ],
        });

        if (!collection) {
            return formatResponse(res, 404, "Collection not found");
        }

        return formatResponse(res, 200, "Collection retrieved successfully", collection);
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Create a new collection
 */
export const store = async (req, res) => {
    try {
        const { name, description, user_id } = req.body;

        const user = await db.User.findByPk(user_id);
        if (!user) {
            return formatResponse(res, 404, "User not found");
        }

        const newCollection = await db.Collection.create({
            name,
            description,
            user_id,
        });

        return formatResponse(res, 201, "Collection created successfully", newCollection);
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Update an existing collection
 */
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const collection = await db.Collection.findByPk(id);
        if (!collection) {
            return formatResponse(res, 404, "Collection not found");
        }

        await collection.update({ name, description });
        return formatResponse(res, 200, "Collection updated successfully", collection);
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Delete a collection
 */
export const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const collection = await db.Collection.findByPk(id);
        if (!collection) {
            return formatResponse(res, 404, "Collection not found");
        }

        await collection.destroy();
        return formatResponse(res, 200, "Collection deleted successfully");
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Get all recommendations of a collection
 */
export const showRecommendations = async (req, res) => {
    try {
        const { collection_id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const collection = await db.Collection.findByPk(collection_id);
        if (!collection) {
            return formatResponse(res, 404, "Collection not found");
        }

        const { count, rows: recommendations } = await db.Recommendation.findAndCountAll({
            include: [
                {
                    model: db.Collection,
                    as: "collections",
                    where: { id: collection_id },
                    through: { attributes: [] },
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
            recommendations,
        });
    } catch (error) {
        handleError(res, error);
    }
};


/**
 * Add a recommendation to a collection
 */
export const addRecommendation = async (req, res) => {
    try {
        const { collection_id, recommendation_id } = req.params;

        const collection = await db.Collection.findByPk(collection_id, {
            include: [{
                model: db.Recommendation,
                as: "recommendations",
                attributes: ["id",]
            }]
        });

        if (!collection) {
            return formatResponse(res, 404, "Collection not found");
        }

        const recommendation = await db.Recommendation.findByPk(recommendation_id);
        if (!recommendation) {
            return formatResponse(res, 404, "Recommendation not found");
        }

        if(recommendation.user_id != collection.user_id){
            return formatResponse(res, 400, "Recommendation dosen't belong to the collection user")
        }

        const duplicate = collection.recommendations.find(x => x.id == recommendation_id);
        if(duplicate){
            return formatResponse(res, 400, "Recommendation already exist in this collection");
        }

        await db.CollectionRecommendationsMapping.create({
            collection_id,
            recommendation_id,
        });

        return formatResponse(res, 201, "Recommendation added to collection successfully");
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Remove a recommendation from a collection
 */
export const removeRecommendation = async (req, res) => {
    try {
        const { collection_id, recommendation_id } = req.params;

        const mapping = await db.CollectionRecommendationsMapping.findOne({
            where: {
                collection_id,
                recommendation_id,
            },
        });

        if (!mapping) {
            return formatResponse(res, 404, "Recommendation not found in the collection");
        }

        await mapping.destroy();

        return formatResponse(res, 200, "Recommendation removed from collection successfully");
    } catch (error) {
        handleError(res, error);
    }
};
