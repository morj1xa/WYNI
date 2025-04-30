const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.YANDEX_REGION,
    endpoint: "https://storage.yandexcloud.net",
    credentials: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
    },
});


const storage = multerS3({
    s3,
    bucket: process.env.YANDEX_BUCKET_NAME,
    acl: "public-read",
    key: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

module.exports = upload;
