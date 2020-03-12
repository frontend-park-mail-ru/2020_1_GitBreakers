'use strict';

const express = require('express');
const fallback = require('express-history-api-fallback');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const opn = require('opn');

const app = express();
const rootPath = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev'));
app.use(express.static(rootPath));

app.use(body.json());
app.use(cookie());


app.use (fallback('index.html', {root: rootPath}));





const port = process.env.PORT || 3009;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
  opn('http://localhost:3009/index.html');
});
