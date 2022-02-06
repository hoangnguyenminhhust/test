const uuid = require('uuid');
const s3 = require('../configs/s3');

module.exports = {
  async getImagePreSignUrl(req, res) {
    try {
      const key = `product/${uuid.v1()}.${req.body.fileType}`;
      const url = await s3.getSignedUrl(
        'putObject',
        {
          Bucket: process.env.S3_BUCKET,
          ContentType: `image/${req.body.fileType}`,
          ContentEncoding: 'base64',
          Key: key,
        },
      );
      res.status(200).send({ key, url });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async getPreSignUrl(req, res) {
    try {
      const key = `product/${uuid.v1()}.${req.body.fileType}`;
      const url = await s3.getSignedUrl(
        'putObject',
        {
          Bucket: process.env.S3_BUCKET,
          ContentType: `image/${req.body.fileType}`,
          Key: key,
        },
      );
      res.status(200).send({ key, url });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async uploadIamge(req, res) {
    // const data = await axios.get('http://localhost:5000/upload');

    res.status(200).send();
  },
  async deleteImage(req, res) {
    return new Promise((resolve, reject) => {
      s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: req.body.key,
      }, (err, data) => {
        if (err) {
          console.log(err);
          res.status(404).send(err);
          return reject(err);
        }
        res.status(200).send(data);
        return resolve(data);
      });
    });
  },
};
