const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
var handler = require('./sessionKeyHandler');
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'Blockchain-Network', 'first-network', 'connection-org1.json');

const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
const mongoURI = `mongodb://127.0.0.1:27017/EHR`;
const conn = mongoose.createConnection(mongoURI);
let gfs;
let databaseHandler = require("./accessDocumentDatabase");

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('LabRecordCollection');
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }

                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: 'LabRecordCollection',
                    metadata: {documentType: 'LabRecord'},
                };
                resolve(fileInfo);
            });
        });
    }
});
const LabRecordCollection = multer({storage});

router.post('/', LabRecordCollection.single('file'), async (req, res) => {

    try {
        let publicId = "";
        console.log(req.body);
        console.log(req.file);

        if (req.file.filename) {
            publicId = await databaseHandler.updateDocumentIntoDatabase(req.body.patientId, "LabRecord", req.file.filename);
            console.log(publicId);
            req.body.labRecordId = publicId;
            req.body.record = req.file.md5;

            let sessionKeyExists = await handler.verifySessionKey(req.body.laboratoryId, req.body.sessionKey);
            if (!sessionKeyExists) {
                await databaseHandler.removeDocumentFromDatabase(req.body.patientId, "LabRecord", publicId);
                res.send("Incorrect");
            } else {
                const walletPath = path.join(process.cwd(), '../wallet');
                const wallet = new FileSystemWallet(walletPath);

                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(ccpPath, {
                    wallet,
                    identity: req.body.laboratoryId,
                    discovery: {enabled: true, asLocalhost: true}
                });

                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork('mychannel');

                // Get the contract from the network.
                const contract = network.getContract('EHR');

                // Submit the specified transaction.

                let response = await contract.submitTransaction('generateLabRecord', JSON.stringify(req.body));
                response = JSON.stringify(response.toString());
                console.log(response);

                // Disconnect from the gateway.
                await gateway.disconnect();

                res.send("Correct");
            }
        } else {
            res.send("Failed to upload the Lab record");
        }
    } catch (error) {
        console.error(`Failed to generate LabRecord by Laboratory ${req.body.userName}: ${error}`);
        res.send("Failed to generate Lab Record");
    } finally {
        conn.close();
    }
});

module.exports = router;
