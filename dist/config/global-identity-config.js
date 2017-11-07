"use strict";
var index_1 = require("./index");
var gimConfiguration = index_1.getConfig({
    test: {
        baseURL: 'https://gim.stone.com.br/api',
        applicationKey: process.env.GLOBAL_APP_KEY || 'test_aplication_key',
        apiKey: process.env.GLOBAL_API_KEY || 'test_api_key'
    },
    production: {
        baseURL: process.env.GLOBAL_IDENTITY_URL || 'https://gim.stone.com.br/api',
        applicationKey: process.env.GLOBAL_APP_KEY,
        apiKey: process.env.GLOBAL_API_KEY
    }
});
module.exports = gimConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWlkZW50aXR5LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZ2xvYmFsLWlkZW50aXR5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW1DO0FBRW5DLElBQU0sZ0JBQWdCLEdBQUcsaUJBQVMsQ0FBQztJQUNqQyxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsOEJBQThCO1FBQ3ZDLGNBQWMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxxQkFBcUI7UUFDbkUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLGNBQWM7S0FDckQ7SUFDRCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSw4QkFBOEI7UUFDMUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztRQUMxQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0tBQ25DO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsaUJBQVMsZ0JBQWdCLENBQUEifQ==