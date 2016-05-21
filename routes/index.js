'use strict';

const express = require('express');
const map = require('async/map');
const request = require('request');

const servers = require('../config').servers;

const router = express.Router();

router.get('*', (req, res, next) => {
  if (req.originalUrl !== '/') {
    return res.redirect('/');
  }

  return next();
});

router.get('/', (req, res, next) => {
  map(servers, getStatus, (err, results) => {
    if (err) {
      return next(err);
    }

    return res.render('index', { results });
  });
});

module.exports = router;

function getStatus(server, callback) {
  if (!server.url) {
    const error = new Error('Sever url required');
    error.status = 400;
    return callback(error);
  }

  return request(server.url, (err, res, body) => {
    let error = null;

    if (err) {
      error = err;
      error.status = res.statusCode;
    } else if (res.statusCode !== 200) {
      const message = `Error: server responded with body: ${JSON.stringify(body)}`;
      error = new Error(message);
      error.status = res.statusCode;
    }

    if (error) {
      return callback(error);
    }

    const data = JSON.parse(body);

    const result = {
      name: server.name,
      url: server.url,
      filesystem: stringToHTML(data.filesystem),
      app: stringToHTML(data.app),
    };

    return callback(null, result);
  });
}

function stringToHTML(str) {
  return str.replace('\n', '<br>');
}
