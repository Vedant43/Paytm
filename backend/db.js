const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://vedantsuthar03:BV2CqqjjWlrZCd1z@cluster0.od6v5ok.mongodb.net/Paytm")

// const userSchema = new mongoose.Schema({
//     username : String,
//     firstName: String,
//     lastName: String,
//     password: String
// })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User = new mongoose.model("User",userSchema)
const Account = new mongoose.model("Account",accountSchema)

module.exports = {
    User,Account
}