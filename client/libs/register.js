export default {
  createUser (username, password, callback) {
    var userObject = {
      username: username,
      password: password
    }
    Accounts.createUser(userObject, function(error){
      if (error) {
        callback(error)
      } else {
        callback(false)
      }
    })
  },

  checkPassword (password, confirm) {
    if (password === confirm) {
      return true
    } else {
      return false
    }
  }
}
