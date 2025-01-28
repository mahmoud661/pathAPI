"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolConfig = exports.MatchingStrategy = void 0;
var MatchingStrategy;
(function (MatchingStrategy) {
    MatchingStrategy[MatchingStrategy["EXACT"] = 1] = "EXACT";
    MatchingStrategy[MatchingStrategy["DOMAIN"] = 2] = "DOMAIN";
    MatchingStrategy[MatchingStrategy["SUB_DOMAIN"] = 3] = "SUB_DOMAIN";
    MatchingStrategy[MatchingStrategy["DOMAIN_INCLUDE"] = 4] = "DOMAIN_INCLUDE";
    MatchingStrategy[MatchingStrategy["REGEX"] = 5] = "REGEX";
})(MatchingStrategy || (exports.MatchingStrategy = MatchingStrategy = {}));
exports.toolConfig = {
    key: ['@devpath.com'],
    match: MatchingStrategy.DOMAIN,
    regex: undefined,
};
//# sourceMappingURL=adminToolConfig.js.map