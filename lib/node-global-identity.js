import request from 'request-promise';
import { renameKeys } from 'string-helper';

function _handleError(json, reject) {
  return reject({ message: json.OperationReport[0].Message });
}

function _response(res, resolve, reject) {
  const json = JSON.parse(res);

  if (json.Success) {
    delete json.OperationReport;
    return resolve(renameKeys(json));
  }

  return _handleError(json, reject);
}

function _getHeaders() {
  return { 'content-type': 'application/json' };
}

export default function GlobalIdentity(obj = {}) {
  const _this = this;
  _this._apiKey = obj.apiKey;
  _this._url = obj.url;

  const _getUrl = (endpoint) => {
    return _this._url + endpoint;
  };

  return {
    setApiKey(apiKey) {
      _this._apiKey = apiKey;
    },

    setUrl(url) {
      _this._url = url;
    },

    authenticate(email, password) {
      return new Promise((resolve, reject) => {
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

        const body = {
          Email: email,
          Password: password,
          ApplicationKey: _this._apiKey,
        };

        return request({
          method: 'POST',
          uri: _getUrl('/api/Authorization/Authenticate'),
          body: JSON.stringify(body),
          headers: _getHeaders(),
        }).then((res) => {
          return _response(res, resolve, reject);
        }).catch((err) => {
          return _handleError(JSON.parse(err.error), reject);
        });
      });
    },

    validateToken(token) {
      return new Promise((resolve, reject) => {
        if (!_this._url) {
          return reject({ message: 'Must have url' });
        }

        if (!_this._apiKey) {
          return reject({ message: 'Must have an apiKey' });
        }

        if (!token) {
          return reject({ message: 'Must have a token' });
        }

        const body = {
          ApplicationKey: this._apiKey,
          Token: token,
        };

        return request({
          method: 'POST',
          uri: _getUrl('/api/Authorization/ValidateToken'),
          body: JSON.stringify(body),
          headers: _getHeaders(),
        }).then((res) => {
          return _response(res, resolve, reject);
        }).catch((err) => {
          return _handleError(JSON.parse(err.error), reject);
        });
      });
    },
  };
}
