const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    reported_by: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account' 
    }],
    parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment',  // Tham chiếu đến comment cha nếu là reply
        default: null 
    },
    replyOnUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account',  // Tham chiếu đến user mà comment này reply
        default: null 
    },
},{
    timestamps: true,
    versionKey: false,
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;