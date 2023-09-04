const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { S3 } = require("aws-sdk");
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");

// Configuração das credenciais da AWS
const s3 = new S3({
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  region: process.env.AWS_DEFAULT_REGION,
});

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acls: "public-read",
    shouldTransform: (req, file, cb) => {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: (req, file, cb) => {
          crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);

            const filename = `${hash.toString("hex")}-${file.originalname}`;

            cb(null, filename);
          });
        },
        transform: (req, file, cb) => {
          cb(null, sharp().jpeg());
        },
      },
    ],
  }),
};

module.exports = {
  dest: path.resolve(__dirname, "..", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/pjpeg"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
};
