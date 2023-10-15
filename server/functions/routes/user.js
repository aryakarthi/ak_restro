const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("User router");
});

router.get("/jwtVerification", async (req, res) => {
  // res.send("JWT verification");
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

module.exports = router;
