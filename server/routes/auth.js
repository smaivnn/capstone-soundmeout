const express = require("express");
const router = express.Router();
const testController = require("../controllers/test/testController");

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: 유저 프로필 정보 조회
 *     description: Returns an array of user objects
 *     parameters:
 *       - userId: userId
 *         in: path
 *         description: User's name
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A object of users
 *         schema:
 *           type: object
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
