import request from 'request-promise';
import lodash from 'lodash';

function handleError(json, reject) {
    return reject({ message: json.OperationReport[0].Message });
}

function response(res, resolve, reject) {
  const json = JSON.parse(res);

  if (json.Success) {
    delete json.OperationReport;
    return resolve(renameKeys(json));
  }

  return handleError(json, reject);
}

function renameKeys(data) {
  if (typeof data !== 'object' || typeof data === 'undefined' || data === null) {
    return data;
  }

  const result = {};
  const keys = Object.keys(data);

  keys.forEach((key) => {
    result[lodash.snakeCase(key)] = renameKeys(data[key]);
  });

  return result;
}

export default class {
  constructor(obj = {}) {
    this._apiKey = obj.apiKey;
    this._url = obj.url;
  }

  setApiKey(apiKey) {
    this._apiKey = apiKey;
  }

  setUrl(url) {
    this._url = url;
  }

  authenticate(email, password) {
    return new Promise((resolve, reject) => {
      if (!this._url) {
        return reject({ message: 'Must have url' });
      }

      if (!this._apiKey) {
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
        ApplicationKey: this._apiKey,
      };

      return request({
        method: 'POST',
        uri: this._getUrl('/api/Authorization/Authenticate'),
        body: JSON.stringify(body),
      }).then((res) => {
        return response(res, resolve, reject);
      }).catch((err) => {
        return handleError(JSON.parse(err.error), reject);
      });
    });
  }

  validateToken(token) {
    return new Promise((resolve, reject) => {
      if (!this._url) {
        return reject({ message: 'Must have url' });
      }

      if (!this._apiKey) {
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
        uri: this._getUrl('/api/Authorization/ValidateToken'),
        body: JSON.stringify(body),
      }).then((res) => {
        return response(res, resolve, reject);
      }).catch((err) => {
        return handleError(JSON.parse(err.error), reject);
      });
    });
  }

  _getUrl(endpoint) {
    return this._url + endpoint;
  }
}
