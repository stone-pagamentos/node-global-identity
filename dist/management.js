"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Management = /** @class */ (function () {
    function Management(applicationKey, apiKey, baseURL) {
        this.applicationKey = applicationKey;
        this.baseURL = baseURL;
        this.baseURL = "/management/" + applicationKey;
    }
    Management.prototype.getURL = function (endpoint) {
        return this.baseURL + endpoint;
    };
    /**
     * List all the roles that are associated with a specific user.
     * @param email user email to be authenticated
     */
    Management.prototype.getUserRoles = function (email) {
        var endpoint = "/user/" + email + "/roles";
        return axios_1.default.get(this.getURL(endpoint))
            .then(function (result) { return result.data; });
    };
    /**
     * Creates an association between the specified roles and user.
     * @param email user email to be authenticated
     * @param roles array to associate to user
     */
    Management.prototype.associateRolesToUser = function (email, roles) {
        if (!(roles && roles.length)) {
            return Promise.reject(new Error('You must provide roles'));
        }
        var endpoint = "/user/" + email + "/roles";
        var body = { roles: roles };
        return axios_1.default.post(this.getURL(endpoint), body)
            .then(function (result) { return result.data; });
    };
    /**
     * Associates a user to your application.
     * @param email user email to be authenticated
     * @param roles array to associate to user
     */
    Management.prototype.addUser = function (email, fullName, password, comment) {
        var endpoint = "/user/" + email;
        var body = {
            fullName: fullName,
            password: password,
            comment: comment || ''
        };
        return axios_1.default.post(this.getURL(endpoint), body)
            .then(function (result) { return result.data; });
    };
    return Management;
}());
exports.Management = Management;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYW5hZ2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsK0JBQXlCO0FBRXpCO0lBQ0Usb0JBQXFCLGNBQXNCLEVBQUUsTUFBYyxFQUFVLE9BQWU7UUFBL0QsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFBMEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNsRixJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFlLGNBQWdCLENBQUE7SUFDaEQsQ0FBQztJQUVPLDJCQUFNLEdBQWQsVUFBZ0IsUUFBZ0I7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQ0FBWSxHQUFuQixVQUFvQixLQUFhO1FBQy9CLElBQU0sUUFBUSxHQUFHLFdBQVMsS0FBSyxXQUFRLENBQUE7UUFFdkMsTUFBTSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFYLENBQVcsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kseUNBQW9CLEdBQTNCLFVBQTRCLEtBQWEsRUFBRSxLQUFvQjtRQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFBO1FBQzVELENBQUM7UUFFRCxJQUFNLFFBQVEsR0FBRyxXQUFTLEtBQUssV0FBUSxDQUFBO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQTtRQUV0QixNQUFNLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQzthQUMzQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFYLENBQVcsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNEJBQU8sR0FBZCxVQUFlLEtBQWEsRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsT0FBZTtRQUMvRSxJQUFNLFFBQVEsR0FBRyxXQUFTLEtBQU8sQ0FBQTtRQUNqQyxJQUFNLElBQUksR0FBRztZQUNYLFFBQVEsVUFBQTtZQUNSLFFBQVEsVUFBQTtZQUNSLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRTtTQUN2QixDQUFBO1FBRUQsTUFBTSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7YUFDM0MsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBWCxDQUFXLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBckRZLGdDQUFVIn0=