const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /noti/create:
 *   post:
 *     summary: 알람 생성
 *     description: header에 token, body에 reciever_id, type, redirectUrl를 보내어 새로운 알림을 생성한다.
 *     tags:
 *       - Noti
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        description: comment와 pulic여부를 body에 넣어주세요.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               reciever_id:
 *                 type: integer
 *                 example: 1
 *               type:
 *                type: string
 *                example: 'paper'
 *               redirectUrl:
 *                type: string
 *                example: 'http://www.naver.com'
 *             required:
 *               - reciever_id, type, redirectUrl
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
router.post("/create");

/**
 * @swagger
 * /noti/{user_id}:
 *   get:
 *     summary: 알림 목록 불러오기
 *     description: header에 token ,paht파라미터에 user_id 통해 해당 유저의 알림을 불러온다.
 *     tags:
 *       - Noti
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
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/${user_id}`);

/**
 * @swagger
 * /noti/read/{noti_id}:
 *   patch:
 *     summary: 알림 읽음 처리
 *     description: header에 token ,paht파라미터에 noti_id 통해 알림을 읽음 처리한다.
 *     tags:
 *       - Noti
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: noti_id
 *         description: noti_id
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
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.patch(`/read/${noti_id}`);
