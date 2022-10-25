const express = require("express");
const qrcode = require("../helper/qrcode")



const printToTerminal = (req, res) => {;
    const data = req.body;
    const stringData = JSON.stringify(data);
    qrcode.toTerminal(stringData);

    res.status(200).send({ done: true });
}; 

module.exports = {
    printToTerminal
};