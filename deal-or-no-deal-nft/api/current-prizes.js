const cron = require('node-cron');

// Mock database (for simplicity)
let prizeData = {
    prizes: Array.from({ length: 500 }, () => Math.floor(Math.random() * 1001)),
    nextUpdate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
};

// CRON job to update prizes every 24 hours
cron.schedule('0 0 * * *', () => {
    prizeData = {
        prizes: Array.from({ length: 500 }, () => Math.floor(Math.random() * 1001)),
        nextUpdate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    };
    console.log('Prizes updated:', prizeData);
});

module.exports = (req, res) => {
    res.json(prizeData);
};
