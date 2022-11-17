const express = require("express");
const qrcodeRoute = require("../controllers/qrcodeCont");

const router = express.Router();

router.post('/print', qrcodeRoute.printToTerminal);

router.post('/read', qrcodeRoute.readQRcode);

module.exports = router;