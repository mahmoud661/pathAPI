"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (process.env.NODE_ENV === 'production') {
    (0, dotenv_1.config)({ path: '.env.prod' });
}
exports.config = {
    port: process.env.PORT || 3001,
    dbHost: process.env.DB_HOST,
    jwtSecret: process.env.JWT_SECRET,
    postmarkToken: process.env.POSTMARK_TOKEN,
    devPathUrl: process.env.DEVPATH_URL,
};
//# sourceMappingURL=config.js.map