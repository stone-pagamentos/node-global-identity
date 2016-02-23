import nock from 'nock';
import sinon from 'sinon';
import GlobalIdentity from '../../lib/node-global-identity.js';
import isAuthenticated from '../../lib/express-middleware.js';
import validateTokenReply from '../fixtures/validate-token-reply.json';
import authenticateReply from '../fixtures/authenticate-reply.json';
import checkRolePermissionReply from '../fixtures/check-permission-reply.json';
import invalidReply
  from '../fixtures/authenticate-invalid-key-reply.json';
import invalidPermission
  from '../fixtures/check-permission-invalid.json';

let globalIdentity;
const userEmail = 'email@email.com';
const userPassword = 'user-password!';
const apiKey = 'global-identity-api-key';
const url = 'http://global.identity.uhul';

beforeEach((done) => {
  globalIdentity = new GlobalIdentity({
    apiKey: apiKey,
    url: url,
  });
  done();
});

afterEach((done) => {
  nock.cleanAll();
  done();
});

describe('GlobalIdentity.constructor', () => {
  it('should accept empty args', (done) => {
    globalIdentity = new GlobalIdentity();
    globalIdentity.should.be.an.Object();
    done();
  });
});

describe('GlobalIdentity.authenticate', () => {
  beforeEach((done) => {
    const body = {
      Email: userEmail,
      Password: userPassword,
      ApplicationKey: apiKey,
    };

    nock(url)
      .post('/api/Authorization/Authenticate', JSON.stringify(body))
      .reply(200, authenticateReply);
    done();
  });

  it('should have url', (done) => {
    globalIdentity.setUrl(undefined);
    globalIdentity.authenticate(userEmail, userPassword).catch((err) => {
      err.message.should.match(/Must have url/);
      done();
    }).catch(done);
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

    nock(url)
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
      ApplicationKey: apiKey,
      Token: token,
    };

    nock(url)
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

  it('should return email', (done) => {
    globalIdentity.validateToken(token).then((res) => {
      res.email
        .should.equal(validateTokenReply.Email);
      done();
    }).catch(done);
  });

  it('should return name', (done) => {
    globalIdentity.validateToken(token).then((res) => {
      res.name
        .should.equal(validateTokenReply.Name);
      done();
    }).catch(done);
  });

  it('should return source_application', (done) => {
    globalIdentity.validateToken(token).then((res) => {
      res.source_application
        .should.equal(validateTokenReply.SourceApplication);
      done();
    }).catch(done);
  });
});

describe('GlobalIdentity.validateToken fail', () => {
  it('should return message error', (done) => {
    const token = 'tokenerrado';
    const bodyToken = {
      ApplicationKey: apiKey,
      Token: token,
    };

    nock(url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyToken))
      .reply(401, invalidReply);

    globalIdentity.validateToken(token).catch((err) => {
      err.message.should.not.be.empty();
      done();
    });
  });
});

describe('GlobalIdentity.checkRolePermission', () => {
  const userKey = 'USERKEYBOLADO';
  const roles = ['ROLES_BOLADO'];
  beforeEach((done) => {
    const bodyUser = {
      ApplicationKey: apiKey,
      UserKey: userKey,
      RoleCollection: roles,
    };

    nock(url)
      .post('/api/Authorization/IsUserInRole', JSON.stringify(bodyUser))
      .reply(200, checkRolePermissionReply);
    done();
  });

  it('should have url', (done) => {
    globalIdentity.setUrl(undefined);
    globalIdentity.checkRolePermission(userKey, roles).catch((err) => {
      err.message.should.match(/Must have url/);
      done();
    });
  });

  it('should have api key', (done) => {
    globalIdentity.setApiKey(undefined);
    globalIdentity.checkRolePermission(userKey, roles).catch((err) => {
      err.message.should.match(/Must have an apiKey/);
      done();
    });
  });

  it('should have user key', (done) => {
    globalIdentity.checkRolePermission(undefined, roles).catch((err) => {
      err.message.should.match(/Must have an userKey/);
      done();
    });
  });

  it('should have user roles', (done) => {
    globalIdentity.checkRolePermission(userKey, undefined).catch((err) => {
      err.message.should.match(/Must have a role/);
      done();
    });
  });

  it('should return success', (done) => {
    globalIdentity.checkRolePermission(userKey, roles).then((res) => {
      res.success.should.equal(checkRolePermissionReply.Success);
      done();
    }).catch(done);
  });
});

describe('GlobalIdentity.checkRolePermission fail', () => {
  it('should return message error', (done) => {
    const userKey = 'USERKEYERRADA';
    const roles = ['ROLES_ERRADO'];
    const bodyUser = {
      ApplicationKey: apiKey,
      UserKey: userKey,
      RoleCollection: roles,
    };

    nock(url)
      .post('/api/Authorization/IsUserInRole', JSON.stringify(bodyUser))
      .reply(401, invalidReply);

    globalIdentity.checkRolePermission(userKey, roles).catch((err) => {
      err.message.should.not.be.empty();
      done();
    });
  });
});

describe('GlobalIdentity.canAccess', () => {
  const invalidUserKey = 'INVALIDUSERKEY';
  const invalidRole = ['ZEFERRADO'];
  const userKey = 'USERKEYBOLADO';
  const roles = ['ROLES_BOLADO'];
  const next = sinon.spy();
  let res;

  beforeEach((done) => {
    res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };

    next.reset();

    const bodyUser = {
      ApplicationKey: apiKey,
      UserKey: userKey,
      RoleCollection: roles,
    };

    const bodyUserFail = {
      ApplicationKey: apiKey,
      UserKey: invalidUserKey,
      RoleCollection: invalidRole,
    };

    nock(url)
      .post('/api/Authorization/IsUserInRole', JSON.stringify(bodyUser))
      .reply(200, checkRolePermissionReply);

    nock(url)
      .post('/api/Authorization/IsUserInRole', JSON.stringify(bodyUserFail))
      .reply(200, invalidPermission);
    done();
  });

  it('should return status code 401 without token', (done) => {
    const req = { headers: [] };
    res.status.withArgs(401).returns(res);

    globalIdentity.canAccess(roles)(req, res, next);
    res.status.calledWith(401).should.be.true();
    done();
  });
});

describe('isAuthenticated (express middleware)', () => {
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
      ApplicationKey: apiKey,
      Token: token,
    };

    const bodyTokenFail = {
      ApplicationKey: apiKey,
      Token: invalidToken,
    };

    nock(url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyToken))
      .reply(200, validateTokenReply);

    nock(url)
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

  it('should return correct req.user', (done) => {
    const req = { headers: { authorization: `Bearer ${token}` } };

    isAuthenticated(globalIdentity)(req, res, next).then(() => {
      req.user.name.should.equal(validateTokenReply.Name);
      req.user.token.should.equal(token);
      req.user.email.should.equal(validateTokenReply.Email);
      req.user.expiration_in_minutes
        .should.equal(validateTokenReply.ExpirationInMinutes);
      done();
    }).catch(done);
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
      ApplicationKey: apiKey,
      Token: token,
    };

    const bodyTokenFail = {
      ApplicationKey: apiKey,
      Token: invalidToken,
    };

    nock(url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyToken))
      .reply(200, validateTokenReply);

    nock(url)
      .post('/api/Authorization/ValidateToken', JSON.stringify(bodyTokenFail))
      .reply(200, invalidReply);
    done();
  });

  it('should return status code 401 without token', (done) => {
    const req = { headers: [] };
    res.status.withArgs(401).returns(res);

    globalIdentity.isAuthenticated(globalIdentity)(req, res, next);
    res.status.calledWith(401).should.be.true();
    done();
  });

  it('should return status code 401 without auth type', done => {
    const req = { headers: { authorization: 'xxxxx' } };
    res.status.withArgs(401).returns(res);

    globalIdentity.isAuthenticated(globalIdentity)(req, res, next);
    res.status.calledWith(401).should.be.true();
    done();
  });

  it('should return status code 401 with invalid token', done => {
    const req = { headers: { authorization: `Bearer ${invalidToken}` } };
    res.status.withArgs(401).returns(res);

    globalIdentity.isAuthenticated(globalIdentity)(req, res, next).then(() => {
      res.status.calledWith(401).should.be.true();
      done();
    });
  });

  it('should return status code 200', done => {
    const req = { headers: { authorization: `Bearer ${token}` } };

    globalIdentity.isAuthenticated(globalIdentity)(req, res, next).then(() => {
      next.called.should.be.true();
      done();
    });
  });

  it('should return correct req.user', (done) => {
    const req = { headers: { authorization: `Bearer ${token}` } };

    globalIdentity.isAuthenticated(globalIdentity)(req, res, next).then(() => {
      req.user.name.should.equal(validateTokenReply.Name);
      req.user.token.should.equal(token);
      req.user.email.should.equal(validateTokenReply.Email);
      req.user.expiration_in_minutes
        .should.equal(validateTokenReply.ExpirationInMinutes);
      done();
    }).catch(done);
  });
});
