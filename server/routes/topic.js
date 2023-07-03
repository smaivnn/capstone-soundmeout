const express = require("express");
const router = express.Router();

const { verifyToken } = require("../utils/middleware/verifyJwtToken");
const {
  verifyAndSendToken,
} = require("../utils/middleware/getListVerifyJwtToken");

const createTopicController = require("../controllers/topic/createTopicController");
const getTopicController = require("../controllers/topic/getTopicController");
const deleteTopicController = require("../controllers/topic/deleteTopicController");
const updateTopicController = require("../controllers/topic/updateTopicController");
const getTopicListController = require("../controllers/topic/getTopicListController");

/**
 * @swagger
 * /topic/create:
 *   post:
 *     summary: 토픽 작성하기
 *     description: header에 token, body에 title, 사진을 보내어 새로운 토픽을 작성한다.
 *     tags:
 *       - Topic
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
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
 *                 redirectPath:
 *                   type: string
 *                   example: /topic/{topic_id}
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
router.post("/create", verifyToken, createTopicController.handleCreateTopic);

/**
 * @swagger
 * /topic/{topic_id}:
 *   get:
 *     summary: 단일 토픽 불러오기
 *     description: paht파라미터에 topic_id를 통해 단일 토픽을 불러온다.
 *     tags:
 *       - Topic
 *     parameters:
 *       - in: path
 *         name: topic_id
 *         description: topic_id
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
 *                   example: 성공적인 토픽 조회
 *                 topicObject:
 *                   type: object
 *                   example: {topic_id: 123, title: "졸업", author: "익명", paper: "array"}
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.get(`/:topic_id`, getTopicController.handleGetTopic);

/**
 * @swagger
 * /topic/delete/{topic_id}:
 *   patch:
 *     summary: 토픽 삭제
 *     description: header로 access_token과 path파라미터로 topic_id를 받아 토픽을 삭제한다.
 *     tags:
 *       - Topic
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: topic_id
 *         description: topic_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No Cotent
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
 */
router.patch(`/update/:topic_id`, deleteTopicController.handleDeleteTopic);

/**
 * @swagger
 * /topic/update/{topic_id}:
 *   put:
 *     summary: 토픽 수정
 *     description: header로 access_token과 path파라미터로 topic_id, body로 title, id를 받아 검증 후 글을 수정한다.
 *     tags:
 *       - Topic
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: topic_id
 *         description: topic_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        description: title, id를 넣어주세요.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "johnDOe"
 *               title:
 *                 type: string
 *                 example: "졸업"
 *             required:
 *               - id
 *               - title
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
 *                   example: 성공적인 토픽 수정
 *                 topicObject:
 *                   type: object
 *                   example: {topic_id: 123, title: "졸업", author: "익명", paper: "array"}
 *                 redirectPath:
 *                   type: string
 *                   example: /topic/{topic_id}
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
router.put(`/update/:topic_id`, updateTopicController.handleUpdateTopic);

router.post(
  `/list`,
  verifyAndSendToken,
  getTopicListController.handleTopicList
);

module.exports = router;
