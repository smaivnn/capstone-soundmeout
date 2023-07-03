const express = require("express");
const router = express.Router();

const { verifyToken } = require("../utils/middleware/verifyJwtToken");
const {verifyAndSendToken} =require("../utils/middleware/getListVerifyJwtToken")

const createPaprtCotroller = require("../controllers/paper/createPaperController");
const readPaperListController = require(`../controllers/paper/readPaperListController`);
const readSinglePaperController = require(`../controllers/paper/readSinglePaperController`);
const updatePaperVisibleController = require(`../controllers/paper/updatePaperVisibleController`);
const deletePaperController = require(`../controllers/paper/deletePaperController`);

/**
 * @swagger
 * /paper/create:
 *   post:
 *     summary: 페이퍼 작성하기
 *     description: header에 token, body에 text를 보내어 새로운 페이퍼를 작성한다.
 *     tags:
 *       - Paper
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        description: text,topic_id, redirectPath를 body에 넣어주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "최성민 슬하에 자녀가 1명 있다."
 *               topic_id:
 *                 type: string
 *                 example: "5f867d3c8f384f7f245c31e6"
 *               redirectPath:
 *                 type: string
 *                 example: "/home/secx"
 *             required:
 *               - text
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
 *                   example: /paper/{paper_id}
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
router.post("/create", verifyToken, createPaprtCotroller.handleCreatePaper);

/**
 * @swagger
 * /paper/delete:
 *   patch:
 *     summary: 페이퍼 삭제
 *     description: header로 access_token과 path파라미터로 paper_id, redirectPath를 받아 토픽을 삭제한다.
 *     tags:
 *       - Paper
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               paper_id:
 *                 type: mongoDB objectId
 *                 example: "5f867d3c8f384f7f245c31e6"
 *               redirectPath:
 *                 type: string
 *                 example: "/topic/list"
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
 *                   example: 성공적인 삭제
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
router.patch(`/delete`, verifyToken, deletePaperController.handleDeletePaper);

/**
 * @swagger
 * /paper/update/visible:
 *   put:
 *     summary: 페이퍼에 공개여부 조정
 *     description: header로 access_token, body로 paper_id를 받아고 페이퍼의 공개여부를 수정한다.
 *     tags:
 *       - Paper
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        description: paper_id를 입력하세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               paper_id:
 *                 type: string
 *                 example: "5f867d3c8f384f7f245c31e6"
 *             required:
 *               - paper_id
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
 *                   example: 성공적인 수정
 *                 paperObject:
 *                   type: object
 *                   example: {paper_id:1,author:"최성민",text:"감자합니다",visible:true}
 *                 redirectPath:
 *                   type: string
 *                   example: /paper/{paper_id}
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
router.put(
  `/visible`,
  verifyToken,
  updatePaperVisibleController.handlePaperVisible
);

/**
 * @swagger
 * /read/:topic_id:
 *   get:
 *     summary: 토픽 내 페이퍼 리스트 불러오기
 *     description: 토픽 내의 페이퍼 리스트를 불러온다.
 *     tags:
 *       - Paper
 *     parameters:
 *       - in: query
 *         name: topic_id
 *         description: topic_id
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
 *                   example: 성공적인 수정
 *                 paperArray:
 *                   type: array
 *                   example: [{paper_id:1,text:"감자합니다",visible:true}]
 *                 redirectPath:
 *                   type: string
 *                   example: /paper/{paper_id}
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
router.post(`/list/:topic_id`,verifyAndSendToken, readPaperListController.handlePaperList);

/**
 * @swagger
 * /read/:paper_id:
 *   get:
 *     summary: 단일 페이퍼 불러오기
 *     description: 단일 페이퍼 불러오기
 *     tags:
 *       - Paper
 *     parameters:
 *       - in: query
 *         name: paper_id
 *         description: paper_id
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
 *                   example: 성공적인 수정
 *                 paperObject:
 *                   type: object
 *                   example: {paper_id:1,text:"감자합니다",visible:true}
 *                 redirectPath:
 *                   type: string
 *                   example: /paper/{paper_id}
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
router.get(`/:paper_id`, readSinglePaperController.handleSinglePaper);
module.exports = router;
