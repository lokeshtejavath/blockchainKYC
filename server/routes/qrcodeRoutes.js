const express = require("express");
const qrcodeRoute = require("../controllers/qrcodeCont");

const router = express.Router();

router.post('/print', qrcodeRoute.printToTerminal);

module.exports = router;