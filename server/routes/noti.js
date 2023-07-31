const express = require("express");
const router = express.Router();

const { verifyToken } = require(`../utils/middleware/verifyJwtToken`);

const checkNotificationListController = require("../controllers/notification/checkNotificaionListController");
const changeReadStatusController = require("../controllers/notification/changeReadStatusController");

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
router.get(
  `/check`,
  verifyToken,
  checkNotificationListController.handleNotificationRead
);

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
router.patch(
  `/read/:notiId`,
  verifyToken,
  changeReadStatusController.handleReadStatus
);

module.exports = router;
