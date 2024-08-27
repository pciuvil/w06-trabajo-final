const User = require("../../models/User")
const userCreate = async () => {

  const user = {
    firstName: "Carlos",
    lastName: "Rodriguez",
    email: "carlos@gmail.com",
    password: "carlos1234",
    phone: "+18094563322"
  }
  await User.create(user)
}

module.exports = userCreate