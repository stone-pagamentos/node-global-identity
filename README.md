# node-global-identity

[![Build Status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![Dev dependencies][dependencies-dev-image]][dependencies-dev-url]

Global identity library for node.js.

# How to install

```bash
npm install node-global-identity
```

# Usage

```js
import GlobalIdentity from 'node-global-identity';

const gi = new GlobalIdentity({
  apiKey: 'YOUR-API-KEY',
  url: 'GLOBAL-IDENTITY-ADDRESS',
});

gi.authenticate(email, password)
  .then((res) => {
    console.log(res);
    // => { authentication_token: 'token',  user_key: 'key', name: 'user name' }
  })
  .catch((err) => {
    console.error(err);
    // => { message: 'message error' }
  });

gi.validateToken(token)
  .then((res) => {
    console.log(res);
    // => {
    // =>   expiration_in_minutes: 60,
    // =>   name: 'Name',
    // =>   email: 'Email',
    // =>   source_application: 'app'
    // => }
  })
  .catch((err) => {
    console.error(err);
    // => { message: 'message error' }
  });
```

## Express middleware

```js
import GlobalIdentity from 'node-global-identity';
import { isAuthenticated } from 'node-global-identity';

const gi = new GlobalIdentity({
  apiKey: 'YOUR-API-KEY',
  url: 'GLOBAL-IDENTITY-ADDRESS',
});

app.use('/path', isAuthenticated(gi), (req, res, next) => {
  console.log(req.user);
  // => {
  // =>   expiration_in_minutes: 60,
  // =>   name: 'Name',
  // =>   email: 'Email',
  // =>   token: 'USER-TOKEN'
  // => }
});
```

[ci-url]: https://travis-ci.org/stone-payments/node-global-identity
[ci-image]: https://travis-ci.org/stone-payments/node-global-identity.svg?branch=master
[coverage-url]: https://coveralls.io/github/stone-payments/node-global-identity?branch=master
[coverage-image]: https://coveralls.io/repos/stone-payments/node-global-identity/badge.svg?branch=master&service=github
[dependencies-url]: https://david-dm.org/stone-payments/node-global-identity
[dependencies-image]: https://david-dm.org/stone-payments/node-global-identity.svg
[dependencies-dev-url]: https://david-dm.org/stone-payments/node-global-identity#info=devDependencies&view=table
[dependencies-dev-image]: https://david-dm.org/stone-payments/node-global-identity/dev-status.svg
