"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const patient_1 = require("../../../models/patient");
const createServer_1 = __importDefault(require("../../../start/createServer"));
const db_1 = __importDefault(require("../../../start/db"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('api/patients', () => {
    let app;
    beforeAll(() => {
        (0, db_1.default)();
        app = (0, createServer_1.default)();
    });
    describe('GET /', () => {
        it('should return all patients', async () => {
            await patient_1.Patient.collection.insertMany([
                { petName: 'pet1', petType: 'type1', ownerName: 'owner1', ownerAddress: 'address1', ownerPhone: 'phone1' },
                { petName: 'pet2', petType: 'type2', ownerName: 'owner2', ownerAddress: 'address2', ownerPhone: 'phone2' }
            ]);
            const response = await (0, supertest_1.default)(app).get('/api/patients');
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body.some((p) => p.petName === 'pet1')).toBeTruthy();
            expect(response.body.some((p) => p.petName === 'pet2')).toBeTruthy();
        });
    });
    describe('POST /', () => {
        it('should add new patient to db return status 200', async () => {
            let newPatient = {
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            };
            const response = await (0, supertest_1.default)(app).post('/api/patients').send(newPatient);
            const patientInDb = await patient_1.Patient.findOne(newPatient);
            expect(patientInDb).toBeTruthy();
            expect(response.statusCode).toBe(200);
        });
        it('should return status 400 if the input in invalid', async () => {
            let newPatient = {
                petName: 'Tom',
                petType: 'Lion',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            };
            const response = await (0, supertest_1.default)(app).post('/api/patients').send(newPatient);
            expect(response.statusCode).toBe(400);
        });
    });
    describe('DELETE /:id', () => {
        it('should delete the patient if the ID is valid', async () => {
            const patient = new patient_1.Patient({
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            await patient.save();
            const response = await (0, supertest_1.default)(app).delete(`/api/patients/${patient._id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe(`${patient.petName} deleted successfully`);
            const deletedPatient = await patient_1.Patient.findById(patient._id);
            expect(deletedPatient).toBeNull();
        });
        it('should return 404 if the patient with given ID does not exist', async () => {
            const response = await (0, supertest_1.default)(app).delete(`/api/patients/${new mongoose_1.default.Types.ObjectId()}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.msg).toBe('Patient not found');
        });
        it('should return 400 if the patient ID is invalid', async () => {
            const response = await (0, supertest_1.default)(app).delete(`/api/patients/invalidId`);
            expect(response.statusCode).toBe(400);
            expect(response.body.msg).toBe('Invalid ID');
        });
    });
    describe('PUT /:id', () => {
        it('should return 400 if the input data is invalid', async () => {
            const patient = new patient_1.Patient({
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            await patient.save();
            const response = await (0, supertest_1.default)(app)
                .put(`/api/patients/${new mongoose_1.default.Types.ObjectId()}`)
                .send({
                petName: '',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            expect(response.statusCode).toBe(400);
        });
        it('should return 404 if the patient does not exist', async () => {
            const response = await (0, supertest_1.default)(app)
                .put(`/api/patients/${new mongoose_1.default.Types.ObjectId()}`)
                .send({
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            console.log(response.body.msg);
            expect(response.statusCode).toBe(404);
            expect(response.body.msg).toBe('Patient not found');
        });
        it('should update the patient if the ID and data are valid', async () => {
            const patient = new patient_1.Patient({
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            await patient.save();
            const updatedData = {
                petName: 'Thomas',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            };
            const response = await (0, supertest_1.default)(app)
                .put(`/api/patients/${patient._id}`)
                .send(updatedData);
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe('Patient updated successfully');
            const patientInDb = await patient_1.Patient.findById(patient._id);
            console.log(patientInDb);
            expect(patientInDb).toHaveProperty('petName', 'Thomas');
        });
    });
    afterEach(async () => {
        await patient_1.Patient.deleteMany({});
    });
    afterAll(async () => {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
    });
});
//# sourceMappingURL=patients.test.js.map