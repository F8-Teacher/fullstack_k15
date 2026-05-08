const bcrypt = require("bcrypt");
const SALT_ROUND = 12;
module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, SALT_ROUND);
  },
  verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
};
