const mailjet = require('node-mailjet')
  .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);

async function sendMail(name, email, newPass) {
  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'luongcaoduc200397@gmail.com',
            Name: 'Lanes',
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: 'Xác nhận mật khẩu',
          TextPart: 'Bạn đã gửi mail quên mật khẩu',
          HTMLPart: `Mât khẩu mới của bạn là: ${newPass}`,
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error.statusCode);
  }
}

module.exports = {
  sendMail,
};
