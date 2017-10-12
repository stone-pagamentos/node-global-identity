"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
exports.getEnv = function (env) { return env || process.env.NODE_ENV || 'test'; };
exports.getConfig = function (config) { return function (env) { return ramda_1.prop(exports.getEnv(env), config); }; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTRCO0FBRWYsUUFBQSxNQUFNLEdBQUcsVUFBQyxHQUFZLElBQUssT0FBQSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFyQyxDQUFxQyxDQUFBO0FBRWhFLFFBQUEsU0FBUyxHQUFHLFVBQUMsTUFBVyxJQUFLLE9BQUEsVUFBQyxHQUFZLElBQUssT0FBQSxZQUFJLENBQUMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixFQUEzQyxDQUEyQyxDQUFBIn0=