"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_routes_1 = __importDefault(require("./API/routes/course.routes"));
const jobs_routes_1 = __importDefault(require("./API/routes/jobs.routes"));
const roadmap_routes_1 = __importDefault(require("./API/routes/roadmap.routes"));
const profile_routes_1 = __importDefault(require("./API/routes/profile.routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = __importDefault(require("./API/middlewares/error.middleware"));
const auth_routes_1 = __importDefault(require("./API/routes/auth.routes"));
const consoleLogger_1 = __importDefault(require("./infrastructure/logger/consoleLogger"));
const config_1 = require("./config");
const topic_routes_1 = __importDefault(require("./API/routes/topic.routes"));
const app = (0, express_1.default)();
let PORT = config_1.config.port || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/profile', profile_routes_1.default);
app.use('/courses', course_routes_1.default);
app.use('/jobs', jobs_routes_1.default);
app.use('/roadmaps', roadmap_routes_1.default);
app.use('/topics', topic_routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(error_middleware_1.default);
app.listen(PORT, () => {
    console.clear();
    consoleLogger_1.default.Success(`\x1b[32mServer is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map