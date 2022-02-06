// eslint-disable-next-line no-unused-vars
const dayjs = require('dayjs');
// const querystring = require('qs');
// const crypto = require('crypto');
// const sha256 = require('sha256');
// const dateFormat = require('dateformat');
// const { promisify } = require('util');
// const getIP = promisify(require('external-ip')());

// function sortObject(o) {
//   const sorted = {};
//   let key; const
//     a = [];

//   // eslint-disable-next-line no-restricted-syntax
//   for (key in o) {
//     // eslint-disable-next-line no-prototype-builtins
//     if (o.hasOwnProperty(key)) {
//       a.push(key);
//     }
//   }

//   a.sort();

//   // eslint-disable-next-line no-plusplus
//   for (key = 0; key < a.length; key++) {
//     sorted[a[key]] = o[a[key]];
//   }
//   return sorted;
// }
const VNPay = require('node-vnpay');

module.exports = {
  async createPaymentUrl(req, res) {
    try {
      const vnpay = new VNPay({
        secretKey: process.env.VNP_HASHSECRET,
        returnUrl: 'http://localhost:8080/order-success',
        merchantCode: process.env.VNP_TMNCODE,
        hashAlgorithm: 'sha256', // optional
      });

      const payURL = await vnpay.genPayURL({
        transactionRef: req.body.orderId,
        orderInfo: `Thanh toan don hang: ${dayjs(new Date()).format('DD/MM/YYYY HH:mm')}`,
        orderType: '110000',
        amount: req.body.total,
      });

      res.status(200).send(payURL);
    } catch (error) {
      res.status(500).send(error);
    }
    // const ipAddr = await getIP();

    // const secretKey = process.env.VNP_HASHSECRET;
    // const date = new Date();
    // let vnpUrl = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    // const vnpParams = {
    //   vnp_Version: '2',
    //   vnp_Command: 'pay',
    //   vnp_Merchant: 'VNPAY',
    //   vnp_TmnCode: process.env.VNP_TMNCODE,
    //   vnp_Locale: 'vn',
    //   vnp_CurrCode: 'VND',
    //   vnp_TxnRef: dateFormat(date, 'HHmmss'),
    //   vnp_OrderInfo: req.body.description,
    //   vnp_OrderType: 110000,
    //   vnp_Amount: req.body.amount * 100,
    //   vnp_ReturnUrl: 'http://sandbox.vnpayment.vn/merchant_webapi/merchant.html',
    //   vnp_IpAddr: ipAddr,
    //   vnp_CreateDate: dateFormat(date, 'yyyymmddHHmmss'),
    //   vnp_BankCode: req.body.bankCode,
    // };

    // sortObject(vnpParams);

    // const signData = secretKey + querystring.stringify(vnpParams, { endcode: false });

    // const secureHash = sha256(signData);

    // vnpParams.vnp_SecureHashType = 'SHA256';
    // vnpParams.vnp_SecureHash = secureHash;

    // vnpUrl += `?${querystring.stringify(vnpParams, { encode: true })}`;

    // res.status(200).json({ code: '00', data: vnpUrl });
  },
};
