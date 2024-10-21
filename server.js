const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const request = require('request');
require('dotenv').config();

const commentsRouter = require('./routes/comments');
// Removed the authRouter as authentication is no longer needed.

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(express.json());

// Removed session and passport initialization as authentication is no longer needed.

// Removed passport initialization.
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/lordicon.js', (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    request('https://cdn.lordicon.com/lordicon.js').pipe(res);
});

app.use('/comments', commentsRouter);
// Removed the authentication routes.
// app.use('/auth', authRouter);

app.get('/Video', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'video.html'));
});

const dbUrl = process.env.MONGO_URI;
mongoose.connect(dbUrl)
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
