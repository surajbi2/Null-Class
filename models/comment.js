const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
    language: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Comment', commentSchema);
