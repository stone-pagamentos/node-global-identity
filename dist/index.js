"use strict";
var management_1 = require("./management");
var authorization_1 = require("./authorization");
var gimConfiguration = require("./config/global-identity-config");
module.exports = function GlobalIdentity(baseURL, aplicationKey, apiKeyConfig) {
    var gimConfig = gimConfiguration();
    var appKey = aplicationKey || gimConfig.aplication_key;
    var apiKey = apiKeyConfig || gimConfig.api_key;
    var baseurl = baseURL || gimConfig.base_url;
    if (!appKey) {
        throw new Error('You must provide an application key');
    }
    if (!baseurl) {
        throw new Error('You must provide the base_url for the Global Identity API');
    }
    if (!apiKey) {
        throw new Error('You must provide API key');
    }
    return {
        Authorization: new authorization_1.Authorization(appKey, baseurl),
        Management: new management_1.Management(appKey, baseurl, apiKey)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUF5QztBQUV6QyxpREFBK0M7QUFDL0Msa0VBQW1FO0FBRW5FLGlCQUFTLHdCQUF5QixPQUFjLEVBQUUsYUFBcUIsRUFBRSxZQUFvQjtJQUMzRixJQUFNLFNBQVMsR0FBK0MsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNoRixJQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQTtJQUN4RCxJQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQTtJQUNoRCxJQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQTtJQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFFRCxNQUFNLENBQUM7UUFDTCxhQUFhLEVBQUUsSUFBSSw2QkFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7UUFDakQsVUFBVSxFQUFFLElBQUksdUJBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztLQUNwRCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=