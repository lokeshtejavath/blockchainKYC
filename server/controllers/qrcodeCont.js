const express = require("express");
const qrcode = require("../helper/qrcode");
const Jimp = require("jimp");
const QRCodeReader = require("qrcode-reader");

const printToTerminal = (req, res) => {
    ;
    const data = req.body;
    const stringData = JSON.stringify(data);
    qrcode.toTerminal(stringData);

    res.status(200).send({ done: true });
};

const readQRcode = (req, res) => {
    const buff = req.body.qr_image_file;
    console.log(req.body);
    Jimp.read(buff, (err, image) => {
        if (err) console.log("error in Jimp " + err);
        else {
            const qrcode = new QRCodeReader();
            qrcode.callback = (err, value) => {
                if (err) console.log("error in qrcode " + err);
                // console.log(value.result);
                const result = JSON.parse(value.result);
                console.log(result);

            };
            qrcode.decode(image.bitmap);
        }
    });
};

module.exports = {
    printToTerminal,
    readQRcode
};