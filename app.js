const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const helmet = require('helmet')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/negara');

const app = express();
app.use(helmet());

const negara = require('./routes/negara');
const benua = require('./routes/benua');


//Middleware
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app header
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requsted-With, Accept, Authorization ');
    next();
});

app.use('/negara', negara);
app.use('/benua', benua);

// catch 404 errors and forward to error handler
app.use((req, res, next) => {
    console.log('err');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler function
app.use((err, req, res, next) => {
    console.log('err2');
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500;
    // respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    // respond to ourselves
    console.error(err);
});
//start the server
const port = app.get('port') || 8000;
app.listen(port, () => console.log(`server berjalan di port ${port}`));