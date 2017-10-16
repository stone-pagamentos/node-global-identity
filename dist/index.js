"use strict";
var management_1 = require("./management");
var authorization_1 = require("./authorization");
var gimConfiguration = require("./config/global-identity-config");
module.exports = function GlobalIdentity(base_url, aplicationKey, apiKeyConfig) {
    var gimConfig = gimConfiguration();
    var appKey = aplicationKey || gimConfig.aplication_key;
    var apiKey = apiKeyConfig || gimConfig.api_key;
    var baseUrl = gimConfig.base_url;
    if (!appKey) {
        throw new Error('You must provide an application key');
    }
    if (!baseUrl) {
        throw new Error('You must provide the base_url for the Global Identity API');
    }
    if (!apiKey) {
        throw new Error('You must provide API key');
    }
    return {
        Authorization: new authorization_1.Authorization(appKey, baseUrl),
        Management: new management_1.Management(appKey, baseUrl, apiKey),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUF5QztBQUV6QyxpREFBK0M7QUFDL0Msa0VBQW1FO0FBRW5FLGlCQUFTLHdCQUF5QixRQUFlLEVBQUUsYUFBcUIsRUFBRSxZQUFvQjtJQUM1RixJQUFNLFNBQVMsR0FBK0MsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNoRixJQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQTtJQUN4RCxJQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQTtJQUNoRCxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFBO0lBRWxDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUVELE1BQU0sQ0FBQztRQUNMLGFBQWEsRUFBRSxJQUFJLDZCQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUNqRCxVQUFVLEVBQUUsSUFBSSx1QkFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQ3BELENBQUE7QUFDSCxDQUFDLENBQUEifQ==