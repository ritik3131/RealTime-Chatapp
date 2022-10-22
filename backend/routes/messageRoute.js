const express = require("express");
const {
    postMessage,
    uploadFile,
    getMessage,
    getOneMessage,
} = require("../controller/messageController");
const { getCurrentUser } = require("../controller/userController");

let fileType = "image";


const multer = require("multer");

const fileStorageEngineImage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `../uploads/image`);
    },

    filename: (req, file, callback) => {
        callback(null, Date.now() + "--" + file.originalname);
    },
});

const fileStorageEngineVideo = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `../uploads/video`);
    },

    filename: (req, file, callback) => {
        callback(null, Date.now() + "--" + file.originalname);
    },
});

const fileStorageEnginePdf = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, `../uploads/pdf`);
    },

    filename: (req, file, callback) => {
        callback(null, Date.now() + "--" + file.originalname);
    },
});



const uploadImage = multer({ storage: fileStorageEngineImage });
const uploadVideo = multer({ storage: fileStorageEngineVideo });
const uploadPdf = multer({ storage: fileStorageEnginePdf });

const router = express.Router();

router.post("/:roomId/new", postMessage);
console.log("Before");
router.post("/:roomId/uploadFile/image",uploadImage.single("image"), uploadFile);
router.post("/:roomId/uploadFile/video", uploadVideo.single("video"), uploadFile);
router.post("/:roomId/uploadFile/pdf", uploadPdf.single("pdf"), uploadFile);

router.get("/:roomId/getMessage", getMessage);
router.get("/user", getCurrentUser);
// router.get('/:messageId',getOneMessage);

module.exports = router;
