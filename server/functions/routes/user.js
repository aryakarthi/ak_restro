const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("User router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Token not found!" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, message: "Unauthorized access!" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      message: `Error in extracting token : ${err}`,
    });
  }
});

const listAllUsers = async (nextPageToken) => {
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUserResult) => {
      listUserResult.users.forEach((userRecord) => {
        data.push(userRecord.toJSON());
      });
      if (listUserResult.pageToken) {
        listAllUsers(listUserResult.pageToken);
      }
    })
    .catch((err) => console.log(err));
};

listAllUsers();

router.get("/all", async (req, res) => {
  listAllUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.length });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in listing users : ${err}`,
    });
  }
});

module.exports = router;
