const { S3 } = require("aws-sdk");

module.exports = function configS3() {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    region: process.env.AWS_DEFAULT_REGION,
  });

  return s3
};
