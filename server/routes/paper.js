const express = require("express");
const router = express.Router();

const {verifyToken} = require("../utils/middleware/verifyJwtToken");

const createPaprtCotroller = require("../controllers/paper/createPaperController");

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
 *        description: text를 body에 넣어주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "최성민 슬하에 자녀가 1명 있다."
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
router.post(
  "/create",
  verifyToken,
  createPaprtCotroller.handleCreatePaper
);

/**
 * @swagger
 * /paper/delete/{paper_id}:
 *   patch:
 *     summary: 페이퍼 삭제
 *     description: header로 access_token과 path파라미터로 paper_id를 받아 토픽을 삭제한다.
 *     tags:
 *       - Paper
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: paper_id
 *         description: paper_id
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
router.patch(`/delete/:paper_id`);

/**
 * @swagger
 * /paper/update/{paper_id}:
 *   put:
 *     summary: 페이퍼에 코멘트 달기
 *     description: header로 access_token, path파라미터로 topic_id, body로 comment, public를 받아서 페이퍼 수정한다.
 *     tags:
 *       - Paper
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
 *     requestBody:
 *        description: comment와 pulic여부를 body에 넣어주세요.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               commnet:
 *                 type: string
 *                 example: "감자합니다."
 *               public:
 *                type: boolean
 *                eample: true
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
router.put(`/update/:paper_id`);

module.exports = router;
