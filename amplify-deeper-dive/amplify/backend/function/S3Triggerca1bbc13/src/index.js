//  amplify/backend/function/<function_name>/src/index.js.
const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const WIDTH = 250;
const HEIGHT = 250;

exports.handler = async (event, context) => {
  const BUCKET = event.Records[0].s3.bucket.name;

  // Get the image data we will use from the first record in the event object
  const KEY = event.Records[0].s3.object.key;
  const PARTS = KEY.split('/');

  // Check to see if the base folder is already set to thumbnails, if it is we return so we do not have a recursive call.
  const BASE_FOLDER = PARTS[1];
  if (BASE_FOLDER === 'thumbnails') return;

  // Decodes the key. ie %40 = @
  const DECODED_KEY = decodeURIComponent(KEY);

  try {
    const image = await s3
      .getObject({ Bucket: BUCKET, Key: DECODED_KEY })
      .promise();

    const resizedImg = await sharp(image.Body).resize(WIDTH, HEIGHT).toBuffer();

    await s3
      .putObject({
        Bucket: BUCKET,
        Body: resizedImg,
        Key: `public/thumbnails/${DECODED_KEY}`,
      })
      .promise();

    return;
  } catch (err) {
    context.fail(`Error resizing files: ${err}`);
  }
};
