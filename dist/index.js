"use strict";
var management_1 = require("./management");
var authorization_1 = require("./authorization");
var gimConfiguration = require("./config/global-identity-config");
module.exports = function GlobalIdentity(options) {
    if (options === void 0) { options = {}; }
    var gimConfig = gimConfiguration();
    var applicationKey = options.applicationKey || gimConfig.applicationKey;
    var apiKey = options.apiKey || gimConfig.apiKey;
    var baseURL = options.baseURL || gimConfig.baseURL;
    if (!applicationKey) {
        throw new Error('You must provide an application key');
    }
    if (!baseURL) {
        throw new Error('You must provide the base_url for the Global Identity API');
    }
    if (!apiKey) {
        throw new Error('You must provide API key');
    }
    return {
        Authorization: new authorization_1.Authorization(applicationKey, baseURL),
        Management: new management_1.Management(applicationKey, apiKey, baseURL)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUF5QztBQUV6QyxpREFBK0M7QUFDL0Msa0VBQW1FO0FBRW5FLGlCQUFTLHdCQUF5QixPQUFpQjtJQUFqQix3QkFBQSxFQUFBLFlBQWlCO0lBQ2pELElBQU0sU0FBUyxHQUErQyxnQkFBZ0IsRUFBRSxDQUFBO0lBQ2hGLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQTtJQUN6RSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFDakQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFBO0lBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFFRCxNQUFNLENBQUM7UUFDTCxhQUFhLEVBQUUsSUFBSSw2QkFBYSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7UUFDekQsVUFBVSxFQUFFLElBQUksdUJBQVUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztLQUM1RCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=