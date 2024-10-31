const mongoose = require("mongoose");
// khai bao doi tuong co so du lieu
const DB = {};
DB.Accounts = require("./account.model");
DB.Categories = require("./category.model");
DB.Posts = require("./post.model");
DB.Comments = require("./comment.model");
DB.Notifications = require("./notification.model");

DB.connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
    })
        .then(() => console.log("connect to MongoDB success"))
        .catch(error => console.error(error.message));
};
module.exports = DB;