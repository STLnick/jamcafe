const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

// URL: https://us-central1-jamcafe-capstone.cloudfunctions.net/addAdminRole
exports.addAdminRole = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const { userEmail } = req.body;
    admin.auth().getUserByEmail(userEmail)
      .then((user) => admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      }))
      .then(() => {
        res.status(200).send(`Success! ${userEmail} has been made an admin.`);
      })
      .catch((err) => {
        console.log('Error adding Admin claim: ', err);
        res.status(500).send(err);
      });
  });
});
