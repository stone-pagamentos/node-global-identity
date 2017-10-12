"use strict";
var authorization_1 = require("./authorization");
module.exports = function GlobalIdentity(aplication_key) {
    return {
        Authorization: new authorization_1.Authorization(aplication_key)
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlEQUErQztBQUUvQyxpQkFBUyx3QkFBd0IsY0FBc0I7SUFFbkQsTUFBTSxDQUFDO1FBQ0gsYUFBYSxFQUFFLElBQUksNkJBQWEsQ0FBQyxjQUFjLENBQUM7S0FDbkQsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9