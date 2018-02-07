import globalIdentity from '../../dist'
import test from 'ava'
import { HmacSHA256 }  from "crypto-js";

const gim = globalIdentity()
const autorization = gim.Authorization
const management = gim.Management

const userData = {
  email: 'vitor.lima@pagar.me',
  password: 'teste@teste',
  TokenExpirationInMinutes: 5,
  UserKey: 'd7061fea-db12-4c0d-a269-0fdfffeb2cde',
  roles: ['role_test'],
};

const ApplicationData = {
  ClientApplicationKey: "d25bcd54-bbe7-4d5f-a213-6cb20c041fb4",
  EncryptedData: "MzM2ODY5YTItYzA4Zi00MWRhLThjNzEtYmViNDMxMjM4NTM3"
}

test('Authorization: authenticate user', async t => {

  const response = await autorization.authenticateUser(userData.email, userData.password, userData.TokenExpirationInMinutes)
  t.true(response.Success)
  t.is(response.TokenExpirationInMinutes, userData.TokenExpirationInMinutes)
  t.not(response.AuthenticationToken, undefined)

}, 'should autheticate user')

test('Authorization: validates token', async t => {

  const { AuthenticationToken } = await autorization.authenticateUser(userData.email, userData.password, userData.TokenExpirationInMinutes)
  const response = await autorization.validateToken(AuthenticationToken)

  t.true(response.Success)

}, 'should validate token')

test('Authorization: renews token', async t => {

  const { AuthenticationToken } = await autorization.authenticateUser(userData.email, userData.password, userData.TokenExpirationInMinutes)
  const response = await autorization.renewToken(AuthenticationToken, userData.TokenExpirationInMinutes)

  t.not(response.NewToken, undefined)
  t.true(response.Success)

}, 'should renew token')


test('Authorization: verifies roles in user', async t => {

  const addRole = await management.associateRolesToUser(userData.email, userData.roles)
  const response = await autorization.isUserInRoles(userData.UserKey, userData.roles)
  t.true(response.Success)

}, 'should verifies roles of a specific user')

test('Authorization: validates Application', async t => {

  const randomString = "stringtest"
  const randomEncryptedString = HmacSHA256(randomString, ApplicationData.EncryptedData).toString()
  const response = await autorization.validateApplication(
    ApplicationData.ClientApplicationKey,
    randomString,
    randomEncryptedString
  )
  t.true(response.Success)

}, 'should verifies roles of a specific user')

// test('Authorization: recovers password', async t => {

//   const response = await autorization.recoverPassword(userData.email);
//   t.true(response.Success)

// }, 'should recover password')
