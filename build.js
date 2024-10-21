const fs = require('fs-extra');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const publicDir = path.join(__dirname, 'public');

// Create build directory
fs.ensureDirSync(buildDir);

// Copy files from public directory to build directory
fs.copy(publicDir, buildDir, err => {
    if (err) {
        console.error('Error copying files:', err);
    } else {
        console.log('Files copied to build directory!');
    }
});
