const express = require("express");
const router = express.Router();

const signupController = require("../controllers/auth/signupController");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 회원가입
 *     description: id, email, name, password를 통해 새로운 회원 가입을 진행한다.
 *     tags:
 *       - Auth
 *     requestBody:
 *        description: 유저정보를 body에넣어주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "john123"
 *               name:
 *                 type: string
 *                 example: "john Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: integer
 *                 example: 12341234
 *             required:
 *               - id
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: Created
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
 *
 */
router.post("/signup",signupController.handleSignup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     description: email과 password를 통해 로그인을 진행하고 token을 반환한다.
 *     tags:
 *       - Auth
 *     requestBody:
 *        description: 유저정보를 body에넣어주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: integer
 *                 example: 12341234
 *             required:
 *               - email
 *               - password
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
 *                   example: 성공적인 로그인
 *                 access_token:
 *                   type: string
 *                   example: "access_token"
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseFailed'
 */
router.post("/login");

/**
 * @swagger
 * /auth/leave:
 *   post:
 *     summary: 계정 탈퇴
 *     description: header로 access_token과 body로 user_id를 받아 검증 후 계정 탈퇴를 진행한다.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        description: user_id를 body에넣어주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1234
 *             required:
 *               - user_id
 *     responses:
 *       204:
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/responseSuccess'
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
router.post(`/leave`);

/**
 * @swagger
 * /auth/update-password:
 *   post:
 *     summary: 비밀번호 변경
 *     description: header로 access_token과 body로 user_id, old_password, new_password를 받아 검증 후 비밀번호를 변경한다.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        description: user_id, old_password, new_password를 넣어주세요.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1231
 *               old_password:
 *                 type: string
 *                 example: qwer1234
 *               new_password:
 *                 type: string
 *                 example: asdf1234
 *             required:
 *               - user_id
 *               - old_password
 *               - new_password
 *     responses:
 *       204:
 *         description: No Content
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
router.post(`/update-password`);

module.exports = router;
