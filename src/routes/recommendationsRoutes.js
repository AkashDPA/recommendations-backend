import express from "express";
import * as recommendationsController from "../controllers/recommendationsController.js";

const recommendationsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: recommendations
 *   description: API for managing recommendations
 */

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Get all recommendations
 *     tags: [recommendations]
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
 *         description: List of all recommendations
 */
recommendationsRouter.get("/", recommendationsController.index);


export default recommendationsRouter;
