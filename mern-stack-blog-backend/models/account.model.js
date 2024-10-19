const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Product name is required"],
        unique: [true, "Product name is duplicate"]
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true, "Email is duplicate"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        validate:{
            validator: (value) => {
                return value.length >= 6;
            },
            message: "Password must be at least 6 characters"
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBan: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true,
    versionKey: false 
});
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
