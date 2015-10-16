'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.renameKeys = renameKeys;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function renameKeys(data) {
  if (typeof data !== 'object' || typeof data === 'undefined' || data === null) {
    return data;
  }

  var result = {};
  var keys = Object.keys(data);

  keys.forEach(function (key) {
    result[_lodash2['default'].snakeCase(key)] = renameKeys(data[key]);
  });

  return result;
}

function handleError(json, reject) {
  return reject({ message: json.OperationReport[0].Message });
}

function response(res, resolve, reject) {
  var json = JSON.parse(res);

  if (json.Success) {
    delete json.OperationReport;
    return resolve(renameKeys(json));
  }

  return handleError(json, reject);
}

var _default = (function () {
  function _default() {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, _default);

    this._apiKey = obj.apiKey;
    this._url = obj.url;
  }

  _createClass(_default, [{
    key: 'setApiKey',
    value: function setApiKey(apiKey) {
      this._apiKey = apiKey;
    }
  }, {
    key: 'setUrl',
    value: function setUrl(url) {
      this._url = url;
    }
  }, {
    key: 'authenticate',
    value: function authenticate(email, password) {
      var _this = this;

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
          uri: _this._getUrl('/api/Authorization/Authenticate'),
          body: JSON.stringify(body)
        }).then(function (res) {
          return response(res, resolve, reject);
        })['catch'](function (err) {
          return handleError(JSON.parse(err.error), reject);
        });
      });
    }
  }, {
    key: 'validateToken',
    value: function validateToken(token) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (!_this2._url) {
          return reject({ message: 'Must have url' });
        }

        if (!_this2._apiKey) {
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
          uri: _this2._getUrl('/api/Authorization/ValidateToken'),
          body: JSON.stringify(body)
        }).then(function (res) {
          return response(res, resolve, reject);
        })['catch'](function (err) {
          return handleError(JSON.parse(err.error), reject);
        });
      });
    }
  }, {
    key: '_getUrl',
    value: function _getUrl(endpoint) {
      return this._url + endpoint;
    }
  }]);

  return _default;
})();

exports['default'] = _default;
//# sourceMappingURL=node-global-identity.js.map
