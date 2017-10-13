"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authorization = /** @class */ (function () {
    function Authorization(applicationKey, baseURL) {
        this.applicationKey = applicationKey;
        this.baseURL = baseURL;
    }
    /**
     *
     * @param email user email to be authenticated
     * @param password user password to be authenticated
     * @param tokenExpirationTime the duration of the auth token in minutes
     */
    Authorization.prototype.authenticateUser = function (email, password, tokenExpirationTime) {
        if (tokenExpirationTime === void 0) { tokenExpirationTime = 2880; }
    };
    return Authorization;
}());
exports.Authorization = Authorization;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDRSx1QkFBcUIsY0FBc0IsRUFBVSxPQUFlO1FBQS9DLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUVwRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSx3Q0FBZ0IsR0FBdkIsVUFBeUIsS0FBYSxFQUFFLFFBQWUsRUFBRSxtQkFBMEI7UUFBMUIsb0NBQUEsRUFBQSwwQkFBMEI7SUFFbkYsQ0FBQztJQUVILG9CQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmYSxzQ0FBYSJ9