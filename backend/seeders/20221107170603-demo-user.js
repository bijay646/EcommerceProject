const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@gmail.com',
      salt: new Date().toString(),
      hashed_password:crypto.createHmac('sha256',Date().toString()).update('Hello123@').digest('hex'),
      isVerified: true,
      role: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};