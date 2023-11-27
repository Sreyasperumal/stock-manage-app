const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") 

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"please enter the name"]
    },
    email:{
        type:String,
        required: [true,"please enter the email"],
        unique : true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please enter the valid email"
        ]
    },
    password:{
        type:String,
        required: [true,"please enter a password"],
        minLength: [6,"password should not be less than 6 characters"],
       // maxLength: [20,"password should not be more than 20 characters"],
    },
photo: {
    type: String,
    required: [true,"please add the photo"],
    default:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
},
phone : {
    type: String,
    default: "+91",
},
bio: {
    type: String,
    maxLength: [300,"Bio should not contain more than 300 words"],
    default: "bio",
},




},  {
    timestamps: true,
})

// encrypt password
   userSchema.pre("save",async function(next){
     if(!this.isModified("password")){
        return next();
     }
    //hash password 
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(this.password,salt)
   this.password = hashedPassword;
   next();
})

const User = mongoose.model("User",userSchema)
module.exports = User