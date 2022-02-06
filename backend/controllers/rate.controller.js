const mongoose = require('mongoose');
const Rate = require('../models/rate');

const { ObjectId } = mongoose.Types;

module.exports = {
  async createRate(req, res) {
    try {
      const rate = new Rate({
        ...req.body,
        created_at: Date.now(),
      });
      await rate.save();

      res.status(200).send(rate);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async getProductRate(req, res) {
    try {
      const limit = parseInt(req.query.limit, 10) || 3;
      const skip = parseFloat(req.query.skip, 10) || 1;
      const [rates, total] = await Promise.all([Rate.find({
        product_id: req.params.productId,
      }).sort({ created_at: 1 }).skip((limit * skip) - limit).limit(limit),
      Rate.find({
        product_id: req.params.productId,
      }).countDocuments(),
      ]);

      res.status(200).send({ rates, total });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async filterRates(req, res) {
    try {
      const rates = await Rate.aggregate([
        {
          $match: {
            product_id: ObjectId(req.body.productId),
          },
        },
        {
          $project: {
            rate: 1,
            product_id: 1,
          },
        },
        {
          $addFields: {
            count: 1,
          },
        },
        {
          $group: {
            _id: {
              rate: '$rate',
            },
            count: { $sum: '$count' },
          },
        },
        {
          $sort: {
            '_id.rate': -1,
          },
        },
      ]);

      res.status(200).send(rates);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
