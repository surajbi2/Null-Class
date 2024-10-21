// const mongoose = require('mongoose');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User');

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch(err => {
//             console.error("Error deserializing user:", err);
//             done(err, null);
//         });
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     scope: ['profile', 'email'],
//     passReqToCallback: true, 
// }, async (req, accessToken, refreshToken, profile, done) => {
//     try {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         if (existingUser) {
//             return done(null, existingUser);
//         }
        
//         const newUser = new User({
//             googleId: profile.id,
//             username: profile.displayName,
//         });

//         await newUser.save(); 
//         done(null, newUser);
//     } catch (error) {
//         console.error("Error during Google authentication:", error);
//         done(error, null);
//     }
// }));
