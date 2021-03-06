import globalIdentity from '../../dist'
import test from 'ava'

const gim = globalIdentity();
const management = gim.Management

const userData = {
  email: 'vitor.lima@pagar.me',
  password: 'teste@teste',
  UserKey: 'd7061fea-db12-4c0d-a269-0fdfffeb2cde',
  roleName: 'role_test'
};

test('Management: associate role(s) to a user', async t => {

    const response = await management.associateRolesToUser(userData.email, [userData.roleName])
    t.true(response.Success)

}, 'should associate role to a user')

test('Management: get role(s) of a user', async t => {

      const response = await management.getUserRoles(userData.email)
      t.true(response.Success)
      t.true(Array.isArray(response.roles))

}, 'should get user`s roles')

test('Management: dissassociate a role of a user', async t => {

      const response = await management.dissociateUserFromRole(userData.email, userData.roleName)
      t.true(response.Success)

}, 'should dissassociate a specific role of a user')

test('Management: activates a user', async t => {

        const response = await management.activateUser(userData.email);
        t.true(response.Success)

}, 'should activate a specific user')

test('Management: gets User', async t => {

          const response = await management.getUser(userData.email);
          t.true(response.hasOwnProperty("user"))
          t.true(response.user.hasOwnProperty("roles"))
          t.true(response.Success)

}, 'should get users detail')

test('Management: gets App Roles', async t => {

      const response = await management.getAppRoles();
      t.true(response.hasOwnProperty("InternalExecutionTime"))
      t.true(response.hasOwnProperty("ExternalExecutionTime"))
      t.true(response.hasOwnProperty("TotalExecutionTime"))
      t.true(response.hasOwnProperty("RequestKey"))
      t.true(response.hasOwnProperty("Roles"))
      t.true(Array.isArray(response.Roles))
}, 'should get app roles')