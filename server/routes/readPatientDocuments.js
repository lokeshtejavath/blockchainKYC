const express = require('express');
const router = express.Router();

const {FileSystemWallet, Gateway, X509WalletMixin} = require('fabric-network');
const path = require('path');
var handler = require('./sessionKeyHandler');
var databaseHandler = require('./accessDocumentDatabase');

const ccpPath = path.resolve(__dirname, '..', '..', '..', 'Blockchain-Network', 'first-network', 'connection-org1.json');


router.post('/', async (req, res) => {

    try {
        let sessionKeyExists = await handler.verifySessionKey(req.body.patientId, req.body.sessionKey);
        if (!sessionKeyExists) {
            res.send("Incorrect");
        } else {
            const walletPath = path.join(process.cwd(), '../wallet');
            const wallet = new FileSystemWallet(walletPath);

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, {
                wallet,
                identity: req.body.patientId,
                discovery: {enabled: true, asLocalhost: true}
            });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('EHR');

            /*
            get the type of document in the form of an array
            and continuously check for the presence of the array in the list
            while checking for the md5 hash as well
            if everything is fine them return the document to the user
            need listsType and the array to get the data

            name of various collection Name

             */
            let documentArray = req.body.ehrs || req.body.bills || req.body.medicineReceipts || req.body.labRecords;
            let documentsDetails = [];
            for (let i = 0; i < documentArray.length; i++) {
                // Submit the specified transaction.
                req.body.assetId = documentArray[i];
                let response = await contract.submitTransaction('readPatientAssets', JSON.stringify(req.body));
                response = JSON.parse(response.toString());
                console.log(response);
                if (response.record) {
                    let collectionName = response.type + 'Collection';
                    let documentType = response.type;
                    let documentId = response.ehrId || response.labRecordId || response.medicineReceiptId || response.billId;
                    console.log(collectionName + " " + documentType + " " + documentId);
                    let documentStorageId = await databaseHandler.getFileDetailsAndDocumentId(response.patientId, documentId, documentType);
                    console.log(documentStorageId);
                    let isCorrect = await databaseHandler.verifyFileExistenceAndHash(documentStorageId, response.record, documentType, collectionName);
                    console.log(isCorrect);
                    if (documentStorageId && isCorrect) {
                        delete response.record;
                        documentsDetails.push(response);
                        console.log("here");
                    }
                }
            }
            // Disconnect from the gateway.
            await gateway.disconnect();
            console.log(documentsDetails);
            res.send(documentsDetails);
        }

    } catch (error) {
        console.error(`Failed fetch documents for the user  ${req.body.patientId}: ${error}`);
        res.send("Failed to fetch documents");
    }
});


module.exports = router;
