import test from 'ava'
import sinon from 'sinon'
import axios from 'axios'
import globalIdentity from '../../dist'
import { Authorization } from '../../dist/authorization'
import { Management } from '../../dist/management'

let sandbox
const resolved = data => Promise.resolve({data});
const gim = globalIdentity();
const authorization = gim.Authorization

test.beforeEach(() => {
  sandbox = sinon.sandbox.create()
})

test.afterEach(() => {
  sandbox.restore()
})

test('Authorization: authenticate user', async (t) => {
  const data = {
    AuthenticationToken: "token",
    TokenExpirationInMinutes: 43242,
    UserKey: "00000000-0000-0000-0000-000000000000",
    Name: "Usuario Teste",
    Success: true
  }

  sandbox.stub(axios, 'get').returns(resolved(data));
  const response = await authorization.authenticateUser("usuario.teste@pagar.me","thiWouldbePassword", 43242);

  t.is(data.AuthenticationToken, response.AuthenticationToken)
  t.is(data.TokenExpirationInMinutes, response.TokenExpirationInMinutes)
  t.is(data.UserKey, response.UserKey)
  t.is(data.Name, response.Name)
  t.is(data.Success, response.Success)
}, 'should return authenticate user data')
