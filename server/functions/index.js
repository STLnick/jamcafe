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

exports.deleteUserByUid = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    const { uid } = req.body;
    admin.auth().deleteUser(uid)
      .then(() => {
        console.log('Successfully deleted user.');
        res.status(200).send(`Deleted user with uid: ${uid}`);
      })
      .catch((err) => {
        console.log('Error deleting user: ', err);
        res.status(500).send('Error deleting user');
      });
  });
});
