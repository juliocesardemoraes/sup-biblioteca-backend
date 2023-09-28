const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {customCssUrl: '/swagger-ui.css'};
const swaggerFile = require('./swagger/swagger_output.json');


const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');

const app = express();
require('dotenv').config()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
