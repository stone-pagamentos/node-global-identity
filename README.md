# node-global-identity


Global identity library for node.js.

# How to install

```bash
npm install node-global-identity
```

# Usage

## Instantiating With Params
```js
import GlobalIdentity from 'node-global-identity';

const gim = new GlobalIdentity({
  applicationKey: 'YOUR-APPLICATION-KEY',
  apiKey: 'YOUR-API-KEY',
  baseURL: 'GLOBAL-IDENTITY-URL',
});
```

## or Setting Env Variables
```
export GLOBAL_APP_KEY=""
export GLOBAL_API_KEY=""
```

```js
import GlobalIdentity from 'node-global-identity';

const gim = new GlobalIdentity();
```


## Authorization 

```ts
* gim.Authorization.authenticateUser( email: string, password:string) : Promise
* gim.Authorization.validateToken (token: string): Promise
* gim.Authorization.renewToken (oldToken: string): Promise
* gim.Authorization.isUserInRoles (userKey:string, roles: [string]): Promise
* gim.Authorization.recoverPassword (email:string): Promise
```

## Management

```ts
* gim.Management.addUser (email: string, fullName: string, comment?:string): Promise
* gim.Management.getUser (email: string)
* gim.Management.deleteUser (email: string)
* gim.Management.getUserRoles (email: string): Promise
* gim.Management.associateRolesToUser (email: string, roles: string[]): Promise
* gim.Management.dissociateUserFromRole (email: string, roleName: string): Promise
```

### [Global Identity API Documentation](http://docs.globalidentity.apiary.io)