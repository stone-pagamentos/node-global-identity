"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var gimConfiguration = index_1.getConfig({
    test: {
        base_url: process.env.GLOBAL_IDENTITY_URL || "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/",
        aplication_key: process.env.GLOBAL_API_KEY
    },
    production: {
        baese_url: process.env.GLOBAL_IDENTITY_URL || "https://arpexid.stone.com.br/api",
        aplication_key: process.env.GLOBAL_API_KEY
    }
});
exports.default = gimConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWlkZW50aXR5LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZ2xvYmFsLWlkZW50aXR5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFtQztBQUVuQyxJQUFNLGdCQUFnQixHQUFHLGlCQUFTLENBQUM7SUFDL0IsSUFBSSxFQUFFO1FBQ0YsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUkscUVBQXFFO1FBQ2xILGNBQWMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7S0FDN0M7SUFDRCxVQUFVLEVBQUU7UUFDUixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxrQ0FBa0M7UUFDaEYsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztLQUM3QztDQUNKLENBQUMsQ0FBQTtBQUVGLGtCQUFlLGdCQUFnQixDQUFDIn0=