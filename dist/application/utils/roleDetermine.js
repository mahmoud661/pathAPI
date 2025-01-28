"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditor = isEditor;
const adminToolConfig_1 = require("../../adminToolConfig");
function isEditor(email) {
    switch (adminToolConfig_1.toolConfig.match) {
        case adminToolConfig_1.MatchingStrategy.REGEX:
            const regex = new RegExp(adminToolConfig_1.toolConfig.regex);
            return regex.test(email);
        case adminToolConfig_1.MatchingStrategy.EXACT:
            return adminToolConfig_1.toolConfig.key.includes(email);
        case adminToolConfig_1.MatchingStrategy.DOMAIN:
            return adminToolConfig_1.toolConfig.key.some((key) => email.endsWith(key));
        case adminToolConfig_1.MatchingStrategy.SUB_DOMAIN:
            const res = adminToolConfig_1.toolConfig.key.some((key) => email.split('@')[1].split('.').includes(key));
            return res;
        case adminToolConfig_1.MatchingStrategy.DOMAIN_INCLUDE:
            return adminToolConfig_1.toolConfig.key.some((key) => email.includes(key));
    }
}
//# sourceMappingURL=roleDetermine.js.map