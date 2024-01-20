const bcrypt = require("bcrypt");

class HashPasswordx {
  constructor(password) {
    this.password = password;
  }
  hashPass = () => {
    return bcrypt.hashSync(this.password, bcrypt.genSaltSync(Math.random()));
  };

  compare(userValidity, password) {
    if (!userValidity || !userValidity.password) {
      return "Invalid user data";
    }

    const passwordValidity = bcrypt.compareSync(
      password,
      userValidity.password
    );

    if (!passwordValidity) {
      return false;
    }

    return true;
  }
}

module.exports = HashPasswordx;
