"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Management = /** @class */ (function () {
    function Management(applicationKey, apiKey, baseURL) {
        this.applicationKey = applicationKey;
        this.baseURL = baseURL;
        this.baseURL = this.baseURL + "/management/" + applicationKey;
        this.request = axios_1.default.create({
            baseURL: "" + this.baseURL,
            timeout: 5000,
            headers: { Authorization: "bearer " + apiKey }
        });
    }
    /**
     * List all the roles that are associated with a specific user.
     * @param email user email to be authenticated
     */
    Management.prototype.getUserRoles = function (email) {
        var endpoint = "/users/" + email + "/roles";
        return this.request.get(endpoint)
            .then(function (result) {
            return result.data;
        });
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
        var endpoint = "/users/" + email + "/roles";
        var body = { roles: roles };
        return this.request.post(endpoint, body)
            .then(function (result) {
            return result.data;
        });
    };
    /**
     * Creates a membership between the user and the application
     * @param email Email of the user to be associated
     * @param fullName Name of the user to be associated
     * @param comment Any comment about the user in your application
     */
    Management.prototype.addUser = function (email, fullName, comment) {
        var endpoint = "/users/" + email;
        var body = {
            fullName: fullName,
            comment: comment || ''
        };
        return this.request.put(endpoint, body)
            .then(function (result) {
            return result.data;
        });
    };
    Management.prototype.deleteUser = function (email) {
        var endpoint = "/users/" + email;
        return this.request.delete(endpoint)
            .then(function (result) { return result.data; });
    };
    Management.prototype.dissociateUserFromRole = function (email, roleName) {
        var endpoint = "/users/" + email + "/roles/" + roleName;
        return this.request.delete(endpoint)
            .then(function (result) { return result.data; });
    };
    Management.prototype.activateUser = function (email) {
        var endpoint = "/users/" + email;
        var body = {
            patches: [{
                    op: 'replace',
                    path: '/active',
                    value: true
                }]
        };
        return this.request.patch(endpoint, body)
            .then(function (result) { return result.data; });
    };
    Management.prototype.deactivateUser = function (email) {
        var endpoint = "/users/" + email;
        var body = {
            patches: [{
                    op: 'replace',
                    path: '/active',
                    value: false
                }]
        };
        return this.request.patch(endpoint, body)
            .then(function (result) { return result.data; });
    };
    Management.prototype.getUser = function (email) {
        var endpoint = "/users/" + email + "?includeRoles=true";
        return this.request.get(endpoint)
            .then(function (result) { return result.data; });
    };
    Management.prototype.getAppRoles = function () {
        var endpoint = "/clientApplications/roles";
        return this.request.get(endpoint)
            .then(function (result) {
            return result.data;
        });
    };
    return Management;
}());
exports.Management = Management;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYW5hZ2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsK0JBQXlCO0FBRXpCO0lBR0Usb0JBQXFCLGNBQXNCLEVBQUUsTUFBYyxFQUFVLE9BQWU7UUFBL0QsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFBMEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNsRixJQUFJLENBQUMsT0FBTyxHQUFNLElBQUksQ0FBQyxPQUFPLG9CQUFlLGNBQWdCLENBQUE7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxLQUFHLElBQUksQ0FBQyxPQUFTO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFlBQVUsTUFBUSxFQUFFO1NBQy9DLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQ0FBWSxHQUFuQixVQUFxQixLQUFhO1FBQ2hDLElBQU0sUUFBUSxHQUFHLFlBQVUsS0FBSyxXQUFRLENBQUE7UUFFeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUM5QixJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx5Q0FBb0IsR0FBM0IsVUFBNkIsS0FBYSxFQUFFLEtBQWU7UUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQTtRQUM1RCxDQUFDO1FBRUQs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