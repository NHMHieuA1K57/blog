const mongoose = require("mongoose");
// khai bao doi tuong co so du lieu
const DB ={};
DB.Accounts = require("./account.model");
DB.Categories = require("./category.model");
DB.Posts = require("./post.model");
DB.Comments = require("./comment.model");
DB.Notifications = require("./notification.model");
DB.connectDB =  async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected successfully to MongoDB server"))
    }
    catch(err){
        next(err);
        process.exit();       
    }
}
module.exports = DB;