const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const registrationRouter = require('./routes/registerRouter');
const queryRouter = require('./routes/queryRouter');

const url = 'mongodb://localhost:27017/step-tracker';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/', queryRouter);
    app.use('/register', registrationRouter);
    app.listen(4000, () => {
        console.log('Server has started in port 4000');
    });
})
