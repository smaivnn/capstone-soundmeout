const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /user/profile/{user_id}:
 *   get:
 *     summary: 유저 프로필 조회
 *     description: path parameter를 통해 user_id를 받아 유저를 검색한다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 성공적인 조회
 *                 userObject:
 *                   type: object
 *                   example: {name: name, id: id}
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/profile/${user_id}`);

/**
 * @swagger
 * /user/topic/{user_id}:
 *   get:
 *     summary: 유저 토픽 조회
 *     description: path parameter를 통해 user_id를 받아 해당 유저의 토픽을 검색한다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 성공적인 조회
 *                 topicArray:
 *                   type: array
 *                   example: [{topic_id: 1, title: title, author: "Obj", paper: "array", createdAt: "2023-04-03"}]
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/topic/${user_id}`);

/**
 * @swagger
 * /user/paper/{user_id}:
 *   get:
 *     summary: 내 페이퍼 조회
 *     description: header에 access token과 path parameter를 통해 user_id를 받아 로그인된 사용자의 페이퍼를 검색한다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: user_id
 *         description: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 성공적인 조회
 *                 paperArray:
 *                   type: array
 *                   example: [{paper_id: 1, text: text, author: "Obj", comment: "array", createdAt: "2023-04-03"}]
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/paper/${user_id}`);

/**
 * @swagger
 * /user/search?find={find}:
 *   post:
 *     summary: 유저 검색
 *     description: 쿼리 파라미터로 찾고자 하는 유저의 아이디/이름을 검색한다. 일치하는 아이디/이름을 갖는 유저를 반환한다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: find
 *         description: find
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 성공적인 조회
 *                 userObject:
 *                   type: object
 *                   example: {user_id: user_id, name: name, id: id}
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.post(`/search`);
module.exports = router;
