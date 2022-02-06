const User = require('../models/user');

const initUser = async () => {
  const user = await User.findOne({ email: 'admin@gmail.com' });
  if (user) return console.log('admin exist');

  const admin = new User({
    email: 'admin@gmail.com',
    password: '1234',
    active: true,
    role: 'admin',
    active_code: null,
    first_name: 'Admin',
    last_name: '',
  });
  await admin.save();
  return console.log('create admin success');
};

module.exports = initUser;
