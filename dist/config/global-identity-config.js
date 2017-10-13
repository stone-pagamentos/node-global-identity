"use strict";
var index_1 = require("./index");
var gimConfiguration = index_1.getConfig({
    test: {
        base_url: "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api",
        aplication_key: "test_api_key"
    },
    production: {
        base_url: process.env.GLOBAL_IDENTITY_URL || "https://arpexid.stone.com.br/api",
        aplication_key: process.env.GLOBAL_API_KEY
    }
});
module.exports = gimConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWlkZW50aXR5LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZ2xvYmFsLWlkZW50aXR5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW1DO0FBRW5DLElBQU0sZ0JBQWdCLEdBQUcsaUJBQVMsQ0FBQztJQUMvQixJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUUsb0VBQW9FO1FBQzlFLGNBQWMsRUFBRSxjQUFjO0tBQ2pDO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksa0NBQWtDO1FBQy9FLGNBQWMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7S0FDN0M7Q0FDSixDQUFDLENBQUE7QUFFRixpQkFBUyxnQkFBZ0IsQ0FBQyJ9