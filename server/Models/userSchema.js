const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, 
         validator(value){
          if(!validator.isEmail(value)){
            throw new Error("invalid email")
          }
         }
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  
  status: {
    type: String,
    required:true
  },
 
});

const users = mongoose.model('users',UserSchema)

module.exports=users;