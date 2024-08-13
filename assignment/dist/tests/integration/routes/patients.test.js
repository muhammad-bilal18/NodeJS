"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const createServer_1 = __importDefault(require("../../start/createServer"));
const db_1 = __importDefault(require("../../start/db"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('api/patients', () => {
    let app;
    beforeAll(() => {
        (0, db_1.default)();
        app = (0, createServer_1.default)();
    });
    describe('GET /', () => {
        it('should return all patients', async () => {
            const response = await (0, supertest_1.default)(app).get('/api/patients');
            expect(response.status).toBe(200);
        });
    });
    afterAll(async () => {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
    });
});
//# sourceMappingURL=patients.test.js.map