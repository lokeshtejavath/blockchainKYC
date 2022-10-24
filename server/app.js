const express = require("express");
var bodyParser = require('body-parser');
const qrcodeRoute = require("./routes/qrcodeRoutes");

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// app.get('/', (req, res) => {
//     res.redirect("/qrcode")
// });

// app.post('/', (req, res) => {
//     res.redirect("/qrcode")
// });

app.use('/qrcode', qrcodeRoute);

app.use((req, res) => {
    res.status(404);
});


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});