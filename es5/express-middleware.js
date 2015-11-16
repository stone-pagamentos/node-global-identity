'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = isAuthenticated;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _depd = require('depd');

var _depd2 = _interopRequireDefault(_depd);

var deprecate = (0, _depd2['default'])('node-global-identity');

function isAuthenticated(globalIdentity) {
  deprecate('isAuthenticated(gi): Use gi.isAuthenticated() instead');

  return function (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    var _req$headers$authorization$split = req.headers.authorization.split(' ');

    var _req$headers$authorization$split2 = _slicedToArray(_req$headers$authorization$split, 2);

    var authType = _req$headers$authorization$split2[0];
    var token = _req$headers$authorization$split2[1];

    if (!authType || !token) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    return globalIdentity.validateToken(token).then(function (result) {
      req.user = Object.assign(result, { token: token });
      return next();
    })['catch'](function () {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    });
  };
}

module.exports = exports['default'];
//# sourceMappingURL=express-middleware.js.map
