// use meteor to store user profile
export default {
  isUserAuth () {
    let isAuth = !!Meteor.userId()
    return isAuth
  },

  login (username, password, callback) {
    Meteor.loginWithPassword(username, password, function (error) {
      console.log("login")
      console.log(error)
      if (error) {
        //console.log(callback)
        callback(error)
      } else {
        callback(false)
      }
    })
  },

  logout (callback) {
    Meteor.logout(function(error){
      if (error) {
        callback(error)
      } else {
        callback(false)
      }
    });
  },
}
