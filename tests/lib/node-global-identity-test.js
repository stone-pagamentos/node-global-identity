import nock from 'nock';
import sinon from 'sinon';
import hat from 'hat';
import GlobalIdentity from '../../lib/node-global-identity.js';
import isAuthenticated from '../../lib/express-middleware.js';
import validateTokenReply from '../fixtures/validate-token-reply.json';
import authenticateReply from '../fixtures/authenticate-reply.json';
import invalidReply
  from '../fixtures/authenticate-invalid-key-reply.json';

let globalIdentity;
const userEmail = 'email@email.com';
const userPassword = 'user-password!';

beforeEach((done) => {
  globalIdentity = new GlobalIdentity({
    apiKey: 'global-identity-api-key',
    url: 'http://global.identity.uhul',
  });
  done();
});

afterEach((done) => {
  nock.cleanAll();
  done();
});

describe('GlobalIdentity.constructor', () => {
  it('should set _apiKey attr', (done) => {
    globalIdentity = new GlobalIdentity({ apiKey: 'api-key-setada' });
    globalIdentity._apiKey.should.equal('api-key-setada');
    done();
  });

  it('should set _url attr', (done) => {
    globalIdentity = new GlobalIdentity({ url: 'http://local.global.identity' });
    globalIdentity._url.should.equal('http://local.global.identity');
    done();
  });

  it('should accept empty args', (done) => {
    globalIdentity = new GlobalIdentity();
    globalIdentity.should.be.an.Object();
    done();
  });
});

describe('GlobalIdentity.setApiKey', () => {
  it('should set _apiKey attr', (done) => {
    globalIdentity.setApiKey('api-key-setada-set');
    globalIdentity._apiKey.should.equal('api-key-setada-set');
    done();
  });
});

describe('GlobalIdentity.setUrl', () => {
  it('should set _url attr', (done) => {
    globalIdentity.setUrl('url');
    globalIdentity._url.should.equal('url');
    done();
  });
});

describe('GlobalIdentity.authenticate', () => {
  beforeEach((done) => {
    const body = {
      Email: userEmail,
      Password: userPassword,
      ApplicationKey: globalIdentity._apiKey,
    };

    nock(globalIdentity._url)
      .post('/api/Authorization/Authenticate', JSON.stringify(body))
      .reply(200, authenticateReply);
    done();
  });

  it('should have url', (done) => {
    globalIdentity.setUrl(undefined);
    globalIdentity.authenticate(userEmail, userPassword).catch((err) => {
      err.message.should.match(/Must have url/);
      done();
    });
  });

  it('should have api key', (done) => {
    globalIdentity.setApiKey(undefined);
    globalIdentity.authenticate(userEmail, userPassword).catch((err) => {
      err.message.should.match(/Must have an apiKey/);
      done();
    });
  });

  it('should have userEmail', (done) => {
    globalIdentity.authenticate(undefined, userPassword).catch((err) => {
      err.message.should.match(/Must have an email/);
      done();
    });
  });

  it('should have userPassword', (done) => {
    globalIdentity.authenticate(userEmail, undefined).catch((err) => {
      err.message.should.match(/Must have a password/);
      done();
    });
  });

  it('should return AuthenticationToken', (done) => {
    globalIdentity.authenticate(userEmail, userPassword).then((res) => {
      res.should.have.property('authentication_token');
      res.authentication_token
        .should.equal(authenticateReply.AuthenticationToken);
      done();
    }).catch(done);
  });

  it('should return UserKey', (done) => {
    globalIdentity.authenticate(userEmail, userPassword).then((res) => {
      res.user_key.should.equal(authenticateReply.UserKey);
      done();
    }).catch(done);
  });

  it('should return Success', (done) => {
    globalIdentity.authenticate(userEmail, userPassword).then((res) => {
      res.success.should.equal(authenticateReply.Success);
      done();
    }).catch(done);
  });
});

describe('GlobalIdentity.authenticate fail', () => {
  it('should return message error', (done) => {
    const body = {
      Email: userEmail,
      Password: userPassword,
      ApplicationKey: '12345',
    };

    nock(globalIdentity._url)
      .post('/api/Authorization/Authenticate', JSON.stringify(body))
      .reply(401, invalidReply);

    globalIdentity.setApiKey('12345');
    globalIdentity.authenticate(userEmail, userPassword).catch((err) => {
      err.message.should.not.be.empty();
      done();
    });
  });
});

describe('GlobalIdentity.validateToken', () => {
  const token = 'TOKENBOLADO';
  beforeEach((done) => {
    const bodyToken = {
      ApplicationKey: globalIdentity._apiKey,
      Token: token,
    };

    nock(globalIdentity._url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyToken))
      .reply(200, validateTokenReply);
    done();
  });

  it('should have url', (done) => {
    globalIdentity.setUrl(undefined);
    globalIdentity.validateToken(token).catch((err) => {
      err.message.should.match(/Must have url/);
      done();
    });
  });

  it('should have api key', (done) => {
    globalIdentity.setApiKey(undefined);
    globalIdentity.validateToken(token).catch((err) => {
      err.message.should.match(/Must have an apiKey/);
      done();
    });
  });

  it('should have token', (done) => {
    globalIdentity.validateToken(undefined).catch((err) => {
      err.message.should.match(/Must have a token/);
      done();
    });
  });

  it('should return expiration_in_minutes', (done) => {
    globalIdentity.validateToken(token).then((res) => {
      res.expiration_in_minutes
        .should.equal(validateTokenReply.ExpirationInMinutes);
      done();
    }).catch(done);
  });

  it('should return success', (done) => {
    globalIdentity.validateToken(token).then((res) => {
      res.success.should.equal(validateTokenReply.Success);
      done();
    }).catch(done);
  });
});

describe('GlobalIdentity.validateToken fail', () => {
  it('should return message error', (done) => {
    const token = 'tokenerrado';
    const bodyToken = {
      ApplicationKey: globalIdentity._apiKey,
      Token: token,
    };

    nock(globalIdentity._url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyToken))
      .reply(401, invalidReply);

    globalIdentity.validateToken(token).catch((err) => {
      err.message.should.not.be.empty();
      done();
    });
  });
});

describe('GlobalIdentity.isAuthenticated (express middleware)', () => {
  const invalidToken = 'invalidToken';
  const token = 'TOKENBOLADO!!';
  const next = sinon.spy();
  let res;

  beforeEach((done) => {
    res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };

    next.reset();

    const bodyToken = {
      ApplicationKey: globalIdentity._apiKey,
      Token: token,
    };

    const bodyTokenFail = {
      ApplicationKey: globalIdentity._apiKey,
      Token: invalidToken,
    };

    nock(globalIdentity._url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyToken))
      .reply(200, validateTokenReply);

    nock(globalIdentity._url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyTokenFail))
      .reply(200, invalidReply);
    done();
  });

  it('should return status code 401 without token', (done) => {
    const req = { headers: [] };
    res.status.withArgs(401).returns(res);

    isAuthenticated(globalIdentity)(req, res, next);
    res.status.calledWith(401).should.be.true();
    done();
  });

  it('should return status code 401 without auth type', done => {
    const req = { headers: { authorization: 'xxxxx' } };
    res.status.withArgs(401).returns(res);

    isAuthenticated(globalIdentity)(req, res, next);
    res.status.calledWith(401).should.be.true();
    done();
  });

  it('should return status code 401 with invalid token', done => {
    const req = { headers: { authorization: `Bearer ${invalidToken}` } };
    res.status.withArgs(401).returns(res);

    isAuthenticated(globalIdentity)(req, res, next).then(() => {
      res.status.calledWith(401).should.be.true();
      done();
    });
  });

  it('should return status code 200', done => {
    const req = { headers: { authorization: `Bearer ${token}` } };

    isAuthenticated(globalIdentity)(req, res, next).then(() => {
      next.called.should.be.true();
      done();
    });
  });
});

describe('ManagementAPI._getHeaders', () => {
  const now = Date.now();
  const verb = 'GET';
  const nonce = hat();
  const apiUri = 'api/Management/applicationkey/users/email';

  it('should return "Authorization" attr', (done) => {
    const result = globalIdentity._getHeaders(verb, apiUri, now, nonce);

    result.should.have.property('Authorization');
    done();
  });

  it('should have hmac', (done) => {
    const result = globalIdentity._getHeaders(verb, apiUri, now, nonce);

    result.Authorization.should.startWith('hmac');
    done();
  });

  it('should have apiKey', (done) => {
    const result = globalIdentity._getHeaders(verb, apiUri, now, nonce);
    const [, apiKey] = result.Authorization.split(' ');

    apiKey.should.startWith(globalIdentity._apiKey);
    done();
  });

  it('should have timestamp', (done) => {
    const result = globalIdentity._getHeaders(verb, apiUri, now, nonce);
    const [, timestamp] = result.Authorization.split(':');
    const stringNow = Math.floor(now / 1000).toString();

    timestamp.should.equal(stringNow);
    done();
  });

  it('should have nonce', (done) => {
    const result = globalIdentity._getHeaders(verb, apiUri, now, nonce);
    const [,, currentNonce] = result.Authorization.split(':');

    currentNonce.should.equal(nonce);
    done();
  });

  it('should have hashedSequence', (done) => {
    const result = globalIdentity._getHeaders(verb, apiUri, now, nonce);
    const [,,, hashedSequence] = result.Authorization.split(':');
    const expectedHash = globalIdentity
      ._getHashedSequence(verb, apiUri, Math.floor(now / 1000), nonce);

    hashedSequence.should.equal(expectedHash);
    done();
  });
});

describe('ManagementAPI._getHashedSequence', () => {
  const now = Math.floor(Date.now() / 1000);
  const verb = 'GET';
  const nonce = hat();
  const apiUri = 'api/Management/applicationkey/users/email';

  it('should not accept POST verb', (done) => {
    const result = globalIdentity
      ._getHashedSequence('POST', apiUri, now, nonce);

    result.should.be.false();
    done();
  });

  it('should not accept PUT verb', (done) => {
    const result = globalIdentity
      ._getHashedSequence('PUT', apiUri, now, nonce);

    result.should.be.false();
    done();
  });

  it('should not accept PATCH verb', (done) => {
    const result = globalIdentity
      ._getHashedSequence('PUT', apiUri, now, nonce);

    result.should.be.false();
    done();
  });

  describe('GET and DELETE verbs', () => {
    it('should return the verb in lower case', (done) => {
      const result = globalIdentity
        ._getHashedSequence(verb, apiUri, now, nonce);

      result.should.startWith(verb.toLowerCase());
      done();
    });

    it('should return api uri in lower case', (done) => {
      const result = globalIdentity
        ._getHashedSequence(verb, apiUri, now, nonce);
      const [, uri] = result.split(';');

      uri.should.startWith(apiUri.toLowerCase());
      done();
    });

    it('should return timestamp', (done) => {
      const result = globalIdentity
        ._getHashedSequence(verb, apiUri, now, nonce);
      const [,, timestamp] = result.split(';');
      const stringNow = now.toString();

      timestamp.should.equal(stringNow);
      done();
    });

    it('should return nonce', (done) => {
      const result = globalIdentity
        ._getHashedSequence(verb, apiUri, now, nonce);
      const [,,, currentNonce] = result.split(';');

      currentNonce.should.equal(nonce.toLowerCase());
      done();
    });
  });
});
