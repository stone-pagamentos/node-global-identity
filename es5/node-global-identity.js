'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = globalIdentity;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _stringHelper = require('string-helper');

function _handleError(json, reject) {
  return reject({ message: json.OperationReport[0].Message });
}

function _response(res, resolve, reject) {
  var json = JSON.parse(res);

  if (json.Success) {
    delete json.OperationReport;
    return resolve((0, _stringHelper.renameKeys)(json));
  }

  return _handleError(json, reject);
}

function _getHeaders() {
  return { 'content-type': 'application/json' };
}

function globalIdentity() {
  var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _this = this;
  _this._apiKey = obj.apiKey;
  _this._url = obj.url;

  var _getUrl = function _getUrl(endpoint) {
    return _this._url + endpoint;
  };

  return {
    setApiKey: function setApiKey(apiKey) {
      _this._apiKey = apiKey;
    },

    setUrl: function setUrl(url) {
      _this._url = url;
    },

    authenticate: function authenticate(email, password) {
      return new Promise(function (resolve, reject) {
        if (!_this._url) {
          return reject({ message: 'Must have url' });
        }

        if (!_this._apiKey) {
          return reject({ message: 'Must have an apiKey' });
        }

        if (!email) {
          return reject({ message: 'Must have an email' });
        }

        if (!password) {
          return reject({ message: 'Must have a password' });
        }

        var body = {
          Email: email,
          Password: password,
          ApplicationKey: _this._apiKey
        };

        return (0, _requestPromise2['default'])({
          method: 'POST',
          uri: _getUrl('/api/Authorization/Authenticate'),
          body: JSON.stringify(body),
          headers: _getHeaders()
        }).then(function (res) {
          return _response(res, resolve, reject);
        })['catch'](function (err) {
          return _handleError(JSON.parse(err.error), reject);
        });
      });
    },

    validateToken: function validateToken(token) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (!_this._url) {
          return reject({ message: 'Must have url' });
        }

        if (!_this._apiKey) {
          return reject({ message: 'Must have an apiKey' });
        }

        if (!token) {
          return reject({ message: 'Must have a token' });
        }

        var body = {
          ApplicationKey: _this2._apiKey,
          Token: token
        };

        return (0, _requestPromise2['default'])({
          method: 'POST',
          uri: _getUrl('/api/Authorization/ValidateToken'),
          body: JSON.stringify(body),
          headers: _getHeaders()
        }).then(function (res) {
          return _response(res, resolve, reject);
        })['catch'](function (err) {
          return _handleError(JSON.parse(err.error), reject);
        });
      });
    }
  };
}

module.exports = exports['default'];
//# sourceMappingURL=node-global-identity.js.map
