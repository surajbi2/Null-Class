const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const geoip = require('geoip-lite');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const router = express.Router();
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     failureRedirect: '/login',
//     failureFlash: true,
//     prompt: 'consent',
// }));

// router.get('/google/callback', (req, res, next) => {
 
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

 
//     const geo = geoip.lookup(ip);
    
//      const southIndiaStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];
//     const isSouthIndia = geo && southIndiaStates.includes(geo?.region);
    
//      const currentHour = new Date().getHours();
    
//      const theme = (currentHour >= 10 && currentHour < 12 && isSouthIndia) ? 'white' : 'dark';

//     passport.authenticate('google', (err, user, info) => {
//         if (err) {
//             console.error("Authentication Error:", err);
//             console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
//             return res.render('video-player', { theme, error: 'Google Authentication failed' });
//         }
        
//         if (!user) {
//             console.error("User not found:", info);
//             console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
//             return res.render('video-player', { theme, error: 'Login failed, viewing as guest' });
//         }

//         req.logIn(user, (err) => {
//             if (err) {
//                 console.error("Login Error:", err);
//                 return res.render('video-player', { theme, error: 'Login failed, viewing as guest' });
//             }

//              res.render('video-player', { theme });
//         });
//     })(req, res, next);
// });


// router.post('/register', [
//     body('username', 'Valid email is required').isEmail(),
//     body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { username, password } = req.body;
//     try {
//         let user = await User.findOne({ username });
//         if (user) return res.status(400).json({ msg: 'User already exists' });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         user = new User({ username, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ msg: 'User registered successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// router.post('/login', [
//     body('username', 'Username is required').notEmpty(),
//     body('password', 'Password is required').exists(),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//         if (!ip) return res.status(400).json({ msg: 'IP address not found' });

//         const geo = geoip.lookup(ip);
//         if (!geo) return res.status(400).json({ msg: 'Location not found' });

//         const southIndiaStates = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'];
//         const isSouthIndia = geo && southIndiaStates.includes(geo.region);

//         const currentHour = new Date().getHours();
//         const theme = (currentHour >= 10 && currentHour < 12 && isSouthIndia) ? 'white' : 'dark';

//         const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

//         if (isSouthIndia) {
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.EMAIL_USER,
//                     pass: process.env.EMAIL_PASS,
//                 },
//             });

//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: username,  
//                 subject: 'Your OTP',
//                 text: `Your OTP is: ${otp}`,
//             };

//             try {
//                 await transporter.sendMail(mailOptions);
//                 console.log('Email sent');
//                 return res.json({ theme });
//             } catch (error) {
//                 return res.status(500).json({ msg: 'Error sending OTP email' });
//             }
//         } else {
//             const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
//             try {
//                 await client.messages.create({
//                     body: `Your OTP is: ${otp}`,
//                     from: process.env.TWILIO_PHONE_NUMBER,
//                     to: username,  
//                 });
//                 console.log('SMS sent');
//                 return res.json({ theme });
//             } catch (error) {
//                 return res.status(500).json({ msg: 'Error sending OTP SMS' });
//             }
//         }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
