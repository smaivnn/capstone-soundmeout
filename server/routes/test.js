const express = require("express");
const router = express.Router();
const testController = require("../controllers/test/testController");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Returns an array of user objects
 *     parameters:
 *       - name: name
 *         in: query
 *         description: User's name
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *   post:
 *     summary: Get a list of users
 *     description: Returns an array of user objects
 *     parameters:
 *       - name: name
 *         in: query
 *         description: User's name
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.post("/", testController.handleTest);

module.exports = router;
