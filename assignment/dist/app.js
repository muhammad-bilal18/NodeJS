"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exception_1 = require("./middlewares/exception");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const logging_1 = __importDefault(require("./start/logging"));
(0, logging_1.default)();
const db_1 = __importDefault(require("./start/db"));
const routes_1 = __importDefault(require("./start/routes"));
(0, db_1.default)();
(0, routes_1.default)(app);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    exception_1.logger.warn(`Server listening on port ${port}`);
});
module.exports = server;
//# sourceMappingURL=app.js.map