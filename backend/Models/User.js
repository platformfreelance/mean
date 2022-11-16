var mongoose=require('mongoose');
// Ajouté pour token
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

var userSchema=mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    // password:{type:String,required:true},
    // Modifier pour token
    encry_password:{type:String,required:true},
    salt:{type:String,required:true},

}
// Ajouté pour token
//***************** */
, {timestamps: true}
)

// Ajouté pour token
userSchema.virtual("password")
  .set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  securePassword: function(plainpassword) {
    if(!plainpassword) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
    } catch (err) {
      return ""
    }
},
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password
  },
}
//***************** */



var User=module.exports=mongoose.model('User',userSchema);