'use strict';

var express = require('express');

var bodyParser = require('body-parser');

var util = require('util');

var request = require('request');

var path = require('path');

var socketIo = require('socket.io');

var http = require('http');

var app = express();
var port = process.env.PORT || 3000;
var post = util.promisify(request.post);
var get = util.promisify(request.get);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var server = http.createServer(app);
var io = socketIo(server);
var BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
var timeout = 0;
var streamURL = new URL(
  'https://api.twitter.com/2/tweets/search/stream?tweet.fields=context_annotations&expansions=author_id'
);
var rulesURL = new URL('https://api.twitter.com/2/tweets/search/stream/rules');
var errorMessage = {
  title: 'Please Wait',
  detail: 'Waiting for new Tweets to be posted...',
};
var authMessage = {
  title: 'Could not authenticate',
  details: [
    'Please make sure your bearer token is correct. \n      If using Glitch, remix this app and add it to the .env file',
  ],
  type: 'https://developer.twitter.com/en/docs/authentication',
};

var sleep = function sleep(delay) {
  return regeneratorRuntime.async(function sleep$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          return _context.abrupt(
            'return',
            new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve(true);
              }, delay);
            })
          );

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  });
};

app.get('/api/rules', function _callee(req, res) {
  var token, requestConfig, response;
  return regeneratorRuntime.async(
    function _callee$(_context2) {
      while (1) {
        switch ((_context2.prev = _context2.next)) {
          case 0:
            if (!BEARER_TOKEN) {
              res.status(400).send(authMessage);
            }

            token = BEARER_TOKEN;
            requestConfig = {
              url: rulesURL,
              auth: {
                bearer: token,
              },
              json: true,
            };
            _context2.prev = 3;
            _context2.next = 6;
            return regeneratorRuntime.awrap(get(requestConfig));

          case 6:
            response = _context2.sent;

            if (!(response.statusCode !== 200)) {
              _context2.next = 13;
              break;
            }

            if (!(response.statusCode === 403)) {
              _context2.next = 12;
              break;
            }

            res.status(403).send(response.body);
            _context2.next = 13;
            break;

          case 12:
            throw new Error(response.body.error.message);

          case 13:
            res.send(response);
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](3);
            res.send(_context2.t0);

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    },
    null,
    null,
    [[3, 16]]
  );
});
app.post('/api/rules', function _callee2(req, res) {
  var token, requestConfig, response;
  return regeneratorRuntime.async(
    function _callee2$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
            if (!BEARER_TOKEN) {
              res.status(400).send(authMessage);
            }

            token = BEARER_TOKEN;
            requestConfig = {
              url: rulesURL,
              auth: {
                bearer: token,
              },
              json: req.body,
            };
            _context3.prev = 3;
            _context3.next = 6;
            return regeneratorRuntime.awrap(post(requestConfig));

          case 6:
            response = _context3.sent;

            if (!(response.statusCode === 200 || response.statusCode === 201)) {
              _context3.next = 11;
              break;
            }

            res.send(response);
            _context3.next = 12;
            break;

          case 11:
            throw new Error(response);

          case 12:
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3['catch'](3);
            res.send(_context3.t0);

          case 17:
          case 'end':
            return _context3.stop();
        }
      }
    },
    null,
    null,
    [[3, 14]]
  );
});

var streamTweets = function streamTweets(socket, token) {
  var stream;
  var config = {
    url: streamURL,
    auth: {
      bearer: token,
    },
    timeout: 31000,
  };

  try {
    var _stream = request.get(config);

    _stream
      .on('data', function (data) {
        try {
          var json = JSON.parse(data);

          if (json.connection_issue) {
            socket.emit('error', json);
            reconnect(_stream, socket, token);
          } else {
            if (json.data) {
              socket.emit('tweet', json);
            } else {
              socket.emit('authError', json);
            }
          }
        } catch (e) {
          socket.emit('heartbeat');
        }
      })
      .on('error', function (error) {
        // Connection timed out
        socket.emit('error', errorMessage);
        reconnect(_stream, socket, token);
      });
  } catch (e) {
    socket.emit('authError', authMessage);
  }
};

var reconnect = function reconnect(stream, socket, token) {
  return regeneratorRuntime.async(function reconnect$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          timeout++;
          stream.abort();
          _context4.next = 4;
          return regeneratorRuntime.awrap(sleep(Math.pow(2, timeout) * 1000));

        case 4:
          streamTweets(socket, token);

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  });
};

io.on('connection', function _callee3(socket) {
  var token, stream;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch ((_context5.prev = _context5.next)) {
        case 0:
          try {
            token = BEARER_TOKEN;
            io.emit('connect', 'Client connected');
            stream = streamTweets(io, token);
          } catch (e) {
            io.emit('authError', authMessage);
          }

        case 1:
        case 'end':
          return _context5.stop();
      }
    }
  });
});
console.log('NODE_ENV is', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  app.use(express['static'](path.join(__dirname, '../build')));
  app.get('*', function (request, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
} else {
  port = 3001;
}

server.listen(port, function () {
  return console.log('Listening on port '.concat(port));
});
