const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /follow/{user_id}:
 *   post:
 *     summary: 팔로잉 하기
 *     description: header에 token, path파라미터로 팔로잉하려는 사람의 user_id 를 전달해서 팔로잉
 *     tags:
 *       - Follow
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
 *     requestBody:
 *        description: title과 사진을 body에 넣어주세요.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "졸업"
 *               imgURL:
 *                 type: string
 *                 example: "imgURL"
 *             required:
 *               - title
 *               - imgURL
 *     responses:
 *       204:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseSuccess'
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
 *
 */
router.post(`/${user_id}`);

/**
 * @swagger
 * /follow/delete/{user_id}:
 *   post:
 *     summary: 팔로잉 취소
 *     description: header에 token, path파라미터로 언팔로우하려는 사람의 user_id 를 전달해서 언팔로우
 *     tags:
 *       - Follow
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
 *       204:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseSuccess'
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
 *
 */
router.post(`/delete/${user_id}`);

/**
 * @swagger
 * /follow/followings/${user_id}:
 *   get:
 *     summary: 팔로잉 목록 불러오기
 *     description: header에 token ,paht파라미터에 user_id 통해 해당 유저의 팔로잉 목록을 불러온다.
 *     tags:
 *       - Follow
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   follower_id:
 *                     type: integer
 *                     example: 11
 *
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/followings/${user_id}`);

/**
 * @swagger
 * /follow/followers/${user_id}:
 *   get:
 *     summary: 팔로워 목록 불러오기
 *     description: header에 token ,paht파라미터에 user_id 통해 해당 유저의 팔로워 목록을 불러온다.
 *     tags:
 *       - Follow
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   follower_id:
 *                     type: integer
 *                     example: 11
 *
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/followers/${user_id}`);
