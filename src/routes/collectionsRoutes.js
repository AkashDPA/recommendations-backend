import express from "express";
import * as collectionsController from "../controllers/collectionsController.js";

const collectionsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: API for managing collections
 */

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get all collections
 *     tags: [Collections]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of all collections
 */
collectionsRouter.get("/", collectionsController.index);

/**
 * @swagger
 * /collections/{id}:
 *   get:
 *     summary: Get a single collection by ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the collection to retrieve
 *     responses:
 *       200:
 *         description: Collection data
 *       404:
 *         description: Collection not found
 */
collectionsRouter.get("/:id", collectionsController.show);

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - user_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the collection
 *               description:
 *                 type: string
 *                 description: Description of the collection
 *               user_id:
 *                 type: integer
 *                 description: ID of the user creating the collection
 *     responses:
 *       201:
 *         description: Collection created successfully
 *       400:
 *         description: Error details
 */
collectionsRouter.post("/", collectionsController.store);

/**
 * @swagger
 * /collections/{id}:
 *   put:
 *     summary: Update a collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the collection to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Collection updated successfully
 *       404:
 *         description: Collection not found
 */
collectionsRouter.put("/:id", collectionsController.update);

/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Delete a collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the collection to delete
 *     responses:
 *       200:
 *         description: Collection deleted successfully
 *       404:
 *         description: Collection not found
 */
collectionsRouter.delete("/:id", collectionsController.destroy);


/**
 * @swagger
 * tags:
 *   name: Collections & Recommendations 
 *   description: API for managing collections & recommendations 
 */

/**
 * @swagger
 * /collections/{collection_id}/recommendations:
 *   get:
 *     summary: Get recommendations for a collection
 *     tags: [Collections & Recommendations ]
 *     parameters:
 *       - in: path
 *         name: collection_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the collection
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of recommendations for the collection
 */
 collectionsRouter.get("/:collection_id/recommendations", collectionsController.showRecommendations);

/**
 * @swagger
 * /collections/{collection_id}/recommendations/{recommendation_id}:
 *   post:
 *     summary: Add a recommendation to a collection
 *     tags: [Collections & Recommendations ]
 *     parameters:
 *       - in: path
 *         name: collection_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the collection
 *       - in: path
 *         name: recommendation_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the recommendation
 *     responses:
 *       201:
 *         description: Recommendation added to collection
 *       404:
 *         description: Collection or recommendation not found
 */
collectionsRouter.post(
    "/:collection_id/recommendations/:recommendation_id",
    collectionsController.addRecommendation
);

/**
 * @swagger
 * /collections/{collection_id}/recommendations/{recommendation_id}:
 *   delete:
 *     summary: Remove a recommendation from a collection
 *     tags: [Collections & Recommendations ]
 *     parameters:
 *       - in: path
 *         name: collection_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the collection
 *       - in: path
 *         name: recommendation_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the recommendation
 *     responses:
 *       200:
 *         description: Recommendation removed from collection
 *       404:
 *         description: Mapping not found
 */
collectionsRouter.delete(
    "/:collection_id/recommendations/:recommendation_id",
    collectionsController.removeRecommendation
);

export default collectionsRouter;
