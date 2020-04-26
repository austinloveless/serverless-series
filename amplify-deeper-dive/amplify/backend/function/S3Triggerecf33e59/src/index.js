const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const WIDTH = 200;
const HEIGHT = 200;

exports.handler = async (event, context) => {
  const BUCKET = event.Records[0].s3.bucket.name;

  // Get the image data we will use from the first record in the event object
  const KEY = event.Records[0].s3.object.key;
  const PARTS = KEY.split('/');

  // Stores the main file name in a variable
  let FILE = PARTS[PARTS.length - 1];

  try {
    const image = await s3.getObject({ Bucket: BUCKET, Key: KEY }).promise();

    const resizedImg = await sharp(image.Body).resize(WIDTH, HEIGHT).toBuffer();

    await s3
      .putObject({
        Bucket: BUCKET,
        Body: resizedImg,
        Key: `public/thumbnail-${FILE}`,
      })
      .promise();

    return;
  } catch (err) {
    context.fail(`Error resizing files: ${err}`);
  }
};
