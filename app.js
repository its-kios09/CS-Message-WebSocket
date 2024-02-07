const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routers = require('./routes/WebRoutes');  // Assuming the correct path to the WebRoutes file

const app = express();

app.use(morgan('dev'));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "[itskios-09]: Too Many requests from this IP, Please try again in an Hour!."
});

app.use('/api', limiter);

// Bodyparser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Mount the routers
app.use('/api/v1/', routers);  // Assuming the correct path to the routers

module.exports = app;
