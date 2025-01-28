"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("./colors"));
class Logger {
    static Error(data, path = '') {
        const now = new Date();
        console.log(colors_1.default.whiteBg + colors_1.default.black, now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), colors_1.default.redBg, 'Error', colors_1.default.reset, colors_1.default.red, `${path && colors_1.default.red}`, path ? ` occurred in ${path} ` : '', colors_1.default.reset, data);
    }
    static Warn(data, path = '') {
        const now = new Date();
        console.log(colors_1.default.whiteBg + colors_1.default.black, now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), colors_1.default.yellowBg, 'Warn', colors_1.default.reset, colors_1.default.yellow, `${path && colors_1.default.yellow}`, path ? ` related to ${path} ` : '', colors_1.default.reset, data);
    }
    static Info(data, path = '') {
        const now = new Date();
        console.log(colors_1.default.whiteBg + colors_1.default.black, now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), colors_1.default.blueBg, 'Info', colors_1.default.reset + colors_1.default.blue, `${path && colors_1.default.blue}`, path ? ` related to ${path} ` : '', colors_1.default.reset, data);
    }
    static Success(data, path = '') {
        const now = new Date();
        console.log(colors_1.default.whiteBg + colors_1.default.black, now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), colors_1.default.greenBg, 'Success', colors_1.default.reset + colors_1.default.green, path ? ` related to ${path} ` : '', colors_1.default.reset, data, colors_1.default.reset);
    }
    static Debug(data, path = '') {
        const now = new Date();
        console.log(colors_1.default.whiteBg + colors_1.default.black, now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(), colors_1.default.magentaBg, 'Debug', colors_1.default.reset + colors_1.default.magenta, path ? ` related to ${path} ` : '', colors_1.default.reset, data, colors_1.default.reset);
    }
}
exports.default = Logger;
//# sourceMappingURL=consoleLogger.js.map