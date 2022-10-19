const express = require("express");
const {
    postMessage,
    uploadFile,
    getMessage,
    getOneMessage,
} = require("../controller/messageController");
const { getCurrentUser } = require("../controller/userController");

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../uploads");
    },
	
    filename: (req, file, callback) => {
        callback(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

const router = express.Router();

router.post("/:roomId/new", postMessage);
router.post("/:roomId/uploadFile", upload.single("image"), uploadFile);


router.get("/:roomId/getMessage", getMessage);
router.get("/user", getCurrentUser);
// router.get('/:messageId',getOneMessage);

module.exports = router;
