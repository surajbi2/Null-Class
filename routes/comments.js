const express = require('express');
const router = express.Router();
const Comment = require('../models/comment'); 
const translate = require('@vitalets/google-translate-api'); 
const { ObjectId } = require('mongoose').Types;

router.get('/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:videoId', async (req, res) => {
    const comment = new Comment({
        videoId: req.params.videoId,
        user: req.body.user,
        text: req.body.text,
        language: req.body.language,
        likes: 0,
        dislikes: 0
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:commentId/like', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        comment.likes += 1;
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:commentId/dislike', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.dislikes += 1;
        console.log(`Comment ID: ${req.params.commentId}, Current Dislikes: ${comment.dislikes}`);

        if (comment.dislikes >= 2) {
            await Comment.deleteOne({ _id: req.params.commentId });
            console.log(`Comment ID: ${req.params.commentId} deleted due to 2 dislikes.`);
            return res.json({ message: 'Comment deleted due to 2 dislikes' });
        }

        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        console.error('Error disliking comment:', err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id/translate/:lang', async (req, res) => {
    const commentId = req.params.id;
    const targetLang = req.params.lang;

    try {
        const comment = await Comment.findById(mongoose.Types.ObjectId(commentId)); 

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        const translatedText = await translateComment(comment.text, targetLang); 

        res.json({
            original: comment.text,
            translated: translatedText 
        });
    } catch (error) {
        console.error('Error in translation:', error);
        res.status(500).json({ message: 'Error translating comment.' });
    }
});


router.delete('/:commentId', async (req, res) => {
    try {
        const result = await Comment.deleteOne({ _id: req.params.commentId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
