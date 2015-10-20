import nock from 'nock';
import GlobalIdentity from '../../lib/node-global-identity.js';
import validateTokenReply from '../fixtures/validate-token-reply.json';
import authenticateReply from '../fixtures/authenticate-reply.json';
import authenticateInvalidKeyReply
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
      .reply(401, authenticateInvalidKeyReply);

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
      .reply(401, authenticateInvalidKeyReply);

    globalIdentity.validateToken(token).catch((err) => {
      err.message.should.not.be.empty();
      done();
    });
  });
});
