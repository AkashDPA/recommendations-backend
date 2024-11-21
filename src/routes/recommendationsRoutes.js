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
 *     responses:
 *       200:
 *         description: List of all recommendations
 */
recommendationsRouter.get("/", recommendationsController.index);


export default recommendationsRouter;
