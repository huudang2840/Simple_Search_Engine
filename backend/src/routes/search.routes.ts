import { SearchController } from "./../controllers/search.controller";
import { Router } from "express";

const router = Router();
const searchController = new SearchController();

router.route("/getTop3").get(searchController.getTop3);
router.route("/add").post(searchController.add);
router.route("/delete").post(searchController.delete);

export default router;

/**
 * @openapi
 *
 * '/api/search/getTop3':
 *  get:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Manage Search
 *     parameters:
 *     - in: query
 *       name: keyword
 *       required: true
 *       schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Success
 *
 * '/api/search/add':
 *  post:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Manage Search
*     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *               keyword:
 *                  type: string
 *                  default: "test"
 *     responses:
 *      200:
 *        description: Success
 
 *
 * '/api/search/delete':
 *  post:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Manage Search
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *               keyword:
 *                  type: string
 *                  default: "test"
 *     responses:
 *      200:
 *        description: Success
 
 */
