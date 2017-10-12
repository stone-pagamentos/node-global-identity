"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authorization = /** @class */ (function () {
    function Authorization(applicationKey) {
        this.applicationKey = applicationKey;
        this.base_url = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFFSSx1QkFBb0IsY0FBc0I7UUFBdEIsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFEbEMsYUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUdyQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLFFBQWUsRUFBRSxtQkFBMEI7UUFBMUIsb0NBQUEsRUFBQSwwQkFBMEI7SUFFbEYsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCYSxzQ0FBYSJ9