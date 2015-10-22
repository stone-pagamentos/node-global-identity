import request from 'request-promise';
import { renameKeys } from 'string-helper';

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

  _getHeaders(verb, uri, now, nonce) {
    const timestamp = Math.floor(now / 1000);
    const hash = this._getHashedSequence(verb, uri, timestamp, nonce);
    return {
      Authorization: `hmac ${this._apiKey}:${timestamp}:${nonce}:${hash}`,
    };
  }

  _getHashedSequence(requestVerb, apiUri, timestamp, nonce) {
    const verb = requestVerb.toLowerCase();
    if (verb !== 'get' && verb !== 'delete') {
      return false;
    }

    return `${verb};${apiUri.toLowerCase()};${timestamp};${nonce}`;
  }

  _getUrl(endpoint) {
    return this._url + endpoint;
  }
}
