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
    Management.prototype.getURL = function (endpoint) {
        return this.baseURL + endpoint;
    };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYW5hZ2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsK0JBQXlCO0FBRXpCO0lBR0Usb0JBQXFCLGNBQXNCLEVBQUUsTUFBYyxFQUFVLE9BQWU7UUFBL0QsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFBMEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNsRixJQUFJLENBQUMsT0FBTyxHQUFNLElBQUksQ0FBQyxPQUFPLG9CQUFlLGNBQWdCLENBQUE7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxLQUFHLElBQUksQ0FBQyxPQUFTO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLFlBQVUsTUFBUSxFQUFFO1NBQy9DLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQ0FBWSxHQUFuQixVQUFxQixLQUFhO1FBQ2hDLElBQU0sUUFBUSxHQUFHLFlBQVUsS0FBSyxXQUFRLENBQUE7UUFFeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUM5QixJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx5Q0FBb0IsR0FBM0IsVUFBNkIsS0FBYSxFQUFFLEtBQWU7UUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQTtRQUM1RCxDQUFDO1FBRUQsSUFBTSxRQUFRLEdBQUcsWUFBVSxLQUFLLFdBQVEsQ0FBQTtRQUN4QyxJQUFNLElBQUksR0FBRyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUE7UUFFdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7YUFDckMsSUFBSSxDQUFDLFVBQUMsTUFBVztZQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNEJBQU8sR0FBZCxVQUNFLEtBQWEsRUFDYixRQUFnQixFQUNoQixRQUFnQixFQUNoQixPQUFlO1FBRWYsSUFBTSxRQUFRLEdBQUcsV0FBUyxLQUFPLENBQUE7UUFDakMsSUFBTSxJQUFJLEdBQUc7WUFDWCxRQUFRLFVBQUE7WUFDUixRQUFRLFVBQUE7WUFDUixPQUFPLEVBQUUsT0FBTyxJQUFJLEVBQUU7U0FDdkIsQ0FBQTtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO2FBQ3JDLElBQUksQ0FBQyxVQUFDLE1BQVc7WUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBbkVELElBbUVDO0FBbkVZLGdDQUFVIn0=
