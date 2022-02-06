/* eslint-disable camelcase */
const Product = require('../models/product');
const Category = require('../models/category');
const Property = require('../models/productProperty');
const RateUserProducts = require('../models/rateUserProduct');
const Recomend = require('../models/recomendProduct');
const OrderDetail = require('../models/orderDetail');

module.exports = {
  async bestSell(req, res) {
    try {
      const topSell = await OrderDetail.aggregate([
        {
          $project: {
            order_id: 1,
            product: 1,
            quantity: 1,
          },
        },
        {
          $group: {
            _id: {
              product: '$product',
            },
            quantity: { $sum: '$quantity' },
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id.product',
            foreignField: '_id',
            as: '_id.product',
          },
        },
        {
          $sort: {
            quantity: -1,
          },
        },
      ]);

      res.status(200).send(topSell);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async createCategory(req, res) {
    try {
      const category = new Category({
        ...req.body,
        created_at: new Date(),
      });
      await category.save();

      res.status(200).send(category);
    } catch (error) {
      res.status(409).send(error);
    }
  },
  async deleteCategory(req, res) {
    try {
      const product = await Product.findOne({
        category_id: req.params.categoryId,
      });
      if (product) {
        return res.status(405).send({
          error: 'You must delete all products in category!!',
        });
      }
      await Category.findByIdAndDelete(req.params.categoryId);

      return res.status(200).send();
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  async listAllCategory(req, res) {
    try {
      const categories = await Category.find();

      res.status(200).send(categories);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async createProduct(req, res) {
    try {
      const data = req.body;
      const product = new Product({
        name: data.name,
        category_id: data.category_id,
        cost_price: Number(data.cost_price),
        price: Number(data.price),
        amount: Number(data.amount),
        description: data.description,
        images: data.images,
        unit: data.unit,
        properties: data.properties,
      });

      await product.save();

      res.status(200).send(product);
    } catch (error) {
      res.status(409).send(error);
    }
  },
  async editProduct(req, res) {
    try {
      await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true,
      });

      res.status(200).send();
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async deleteProduct(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.productId);

      res.status(200).send();
    } catch (error) {
      res.status(404).send();
    }
  },
  async listAllProduct(req, res) {
    try {
      const products = await Product.find().populate('category_id');

      res.status(200).send(products);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.productId);

      res.status(200).send(product);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async createProductProp(req, res) {
    try {
      const property = new Property(req.body);
      const product = await Product.findById(req.params.productId);
      await property.save();
      product.properties.push(property._id);
      await product.save();

      res.status(200).send(property);
    } catch (error) {
      res.status(409).send(error);
    }
  },
  async deleteProductProp(req, res) {
    try {
      await Property.findByIdAndDelete(req.params.propertyId);

      res.status(200).send();
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async getProductByCategory(req, res) {
    try {
      const {
        startPrice,
        endPrice,
      } = req.body;
      const conditionObject = {
        category_id: req.body.category_id,
        price: {
          $gte: startPrice || 0,
          $lte: endPrice || 100000000,
        },
      };

      const products = await Product.find(conditionObject);

      res.status(200).send(products);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async listProductByCondition(req, res) {
    try {
      let conditionObjet = {};
      if (req.body.name) {
        conditionObjet = Object.assign(conditionObjet, {
          name: {
            $regex: req.body.name,
            $options: 'i',
          },
        });
      }
      const limit = parseInt(req.query.limit, 10) || 10;
      const skip = parseFloat(req.query.skip, 10) || 1;
      const [products, totalProducts] = await Promise.all([
        Product.find(conditionObjet).sort({
          created_at: -1,
        })
          .skip((limit * skip) - limit).limit(limit),
        Product.find(conditionObjet).countDocuments(),
      ]);

      res.status(200).send({
        products,
        totalProducts,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  // async getTotalProductPrice(req, res) {

  // After 5s call this function to count view total user by product
  async countProduct(req, res) {
    // eslint-disable-next-line camelcase
    const device_id = req.header('DeviceCode');
    const options = {
      product_id: req.params.productId,
      this_id: device_id,
    };
    try {
      if (req.user) {
        if (req.user._id !== null) {
          options.this_id = req.user._id;
        }
      }
      const product = await Product.findById(req.params.productId);
      // eslint-disable-next-line no-undef
      const rate_user_product = await RateUserProducts.findOne(options);
      if (rate_user_product) {
        rate_user_product.total_view += 1;
        await RateUserProducts.updateOne(options, rate_user_product);
        res.status(200).send(product);
      } else {
        await RateUserProducts.create(options);
        res.status(200).send(product);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async getRecomendProductOverall(req, res) {
    const device_id = req.header('DeviceCode');
    const options = {
      product_id: req.params.productId,
      this_id: device_id,
    };
    try {
      if (req.user) {
        if (req.user._id !== null) {
          options.this_id = req.user._id;
        }
      }
      const recomend = await Recomend.findOne(options); // REcomend theo giá
      if (!recomend) {
        const result = Product.find().sort({
          views: -1,
        }).limit(10);
        res.status(200).send(result);
      } else {
        // eslint-disable-next-line camelcase
        const avg_cost = recomend.list_cost.reduce((a, b) => a + b, 0) / recomend.list_cost.length;
        const min_cost = 0.8 * avg_cost;
        const max_cost = 1.2 * avg_cost;
        const result = await RateUserProducts.aggregate([{
          $match: {
            this_id: options.this_id,
          },
        },
        {

          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $match: {
            'product.price': {
              $gt: min_cost,
              $lt: max_cost,
            },
          },
        },
        {
          $sort: {
            'product.views': -1,
            'product.amount': -1,
            total_view: -1,
          },
        },
        {
          $limit: 10,
        },
        ]);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  },
  // async getRecomendeProductInDetailProduct(req, res) {
  //   const device_id = req.header('DeviceCode');
  //   const options = {
  //     product_id: req.params.productId,
  //     this_id: device_id,
  //   };
  //   try {
  //     if (req.user) {
  //       if (req.user._id !== null) {
  //         options.this_id = req.user._id;
  //       }
  //     }

  //     const product = await Product.findById(product_id);
  //     const min_cost = 0.8 * product.price;
  //     const max_cost = 1.2 * product.price;
  //     const result = await RateUserProducts.aggregate([{
  //       $match: {
  //         this_id: options.this_id,
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'products',
  //         localField: 'product_id',
  //         foreignField: '_id',
  //         as: 'product',
  //       },
  //     },
  //     {
  //       $match: {
  //         'product.price': {
  //           $gt: min_cost,
  //           $lt: max_cost,
  //         },
  //       },
  //     },
  //     {
  //       $sort: {
  //         'product.views': -1,
  //         'product.amount': -1,
  //         total_view: -1,
  //       },
  //       ]);
  //       res.status(200).send(result);
  //     }
  //   } catch (error) {
  //     res.status(404).send(error);
  //   }
  // },
  async getRecomendeProductInDetailProduct(req, res) {
    const device_id = req.header('DeviceCode');
    const options = {
      product_id: req.params.productId,
      this_id: device_id,
    };
    try {
      if (req.user) {
        if (req.user._id !== null) {
          options.this_id = req.user._id;
        }
      }

      const product = await Product.findById(options.product_id);
      const min_cost = 0.8 * product.price;
      const max_cost = 1.2 * product.price;
      const result = await Product.find({
        price: {
          $gte: min_cost,
          $lte: max_cost,
        },
      }).limit(4);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
