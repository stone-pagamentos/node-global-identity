import depd from 'depd';

const deprecate = depd('node-global-identity');

export default function isAuthenticated(globalIdentity) {
  deprecate('isAuthenticated(gi): Use gi.isAuthenticated() instead');

  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    const [authType, token] = req.headers.authorization.split(' ');

    if (!authType || !token) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    return globalIdentity.validateToken(token).then((result) => {
      req.user = Object.assign(result, { token });
      return next();
    }).catch(() => {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    });
  };
}
