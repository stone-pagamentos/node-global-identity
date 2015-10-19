# node-global-identity

[![Build Status](https://travis-ci.org/stone-payments/node-global-identity.svg?branch=master)](https://travis-ci.org/stone-payments/node-global-identity)

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
    // => { expiration_in_minutes: 60 }
  })
  .catch((err) => {
    console.error(err);
    // => { message: 'message error' }
  });
```
