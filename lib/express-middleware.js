export default function isAuthenticated(globalIdentity) {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    const [authType, token] = req.headers.authorization.split(' ');

    if (!authType || !token) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    return globalIdentity.validateToken(token).then((result) => {
      req.token = {
        token,
        expiration_in_minutes: result.expiration_in_minutes,
      };
      return next();
    }).catch(() => {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    });
  };
}
