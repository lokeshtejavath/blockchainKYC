const QRcode = require("qrcode");

function toTerminal(data) {
    // const stringData = JSON.stringify(data);
    QRcode.toString(data, { type: 'terminal', width: 300, height: 300 }, function (err, code) {
        if (err) return console.log("error occured while converting data to string");
        console.log(code);
    });
}

module.exports = {
    toTerminal: toTerminal
};