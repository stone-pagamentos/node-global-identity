"use strict";
var management_1 = require("./management");
var authorization_1 = require("./authorization");
var gimConfiguration = require("./config/global-identity-config");
module.exports = function GlobalIdentity(aplicationKey) {
    var gimConfig = gimConfiguration();
    var apiKey = aplicationKey || gimConfig.aplication_key;
    var baseUrl = gimConfig.aplication_key;
    if (!apiKey) {
        throw new Error('You must provide an application key');
    }
    if (!baseUrl) {
        throw new Error('You must provide the base_url for the Global Identity API');
    }
    return {
        Authorization: new authorization_1.Authorization(apiKey, baseUrl),
        Management: new management_1.Management(apiKey, baseUrl),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUF5QztBQUV6QyxpREFBK0M7QUFDL0Msa0VBQW1FO0FBRW5FLGlCQUFTLHdCQUF5QixhQUFxQjtJQUNyRCxJQUFNLFNBQVMsR0FBK0MsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNoRixJQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQTtJQUN4RCxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFBO0lBRXhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFFRCxNQUFNLENBQUM7UUFDTCxhQUFhLEVBQUUsSUFBSSw2QkFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7UUFDakQsVUFBVSxFQUFFLElBQUksdUJBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0tBQzVDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==