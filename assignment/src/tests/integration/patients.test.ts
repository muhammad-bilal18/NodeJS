import request from 'supertest';
import { Express } from 'express';
import { Patient } from '../../models/patient';
import createServer from '../../start/createServer';
import connectToDatabase from '../../start/db';
import mongoose from 'mongoose';

describe('api/patients', () => {
    let app: Express;
    beforeAll(() => {
        connectToDatabase();
        app = createServer();
    });


    describe('GET /', () => {
        it('should return all patients', async () => {
            await Patient.collection.insertMany([
                { petName: 'pet1', petType: 'type1', ownerName: 'owner1', ownerAddress: 'address1', ownerPhone: 'phone1'},
                { petName: 'pet2', petType: 'type2', ownerName: 'owner2', ownerAddress: 'address2', ownerPhone: 'phone2'}
            ])
            const response = await request(app).get('/api/patients');
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body.some((p: { petName: string; }) => p.petName === 'pet1')).toBeTruthy();
            expect(response.body.some((p: { petName: string; }) => p.petName === 'pet2')).toBeTruthy();
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
            }
            const response = await request(app).post('/api/patients').send(newPatient);
            const patientInDb = await Patient.findOne(newPatient);
            expect(patientInDb).toBeTruthy();
            expect(response.statusCode).toBe(200);
        });
        
        it('should return status 400 if the input in invalid', async () => {
            let newPatient = {
                petName: 'Tom',
                petType: 'Lion', // invalid petName
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            }
            const response = await request(app).post('/api/patients').send(newPatient);
            expect(response.statusCode).toBe(400);
        });
    });

    describe('DELETE /:id', () => {
        it('should delete the patient if the ID is valid', async () => {
            const patient = new Patient({
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            await patient.save();

            const response = await request(app).delete(`/api/patients/${patient._id}`);
   
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe(`${patient.petName} deleted successfully`);
            const deletedPatient = await Patient.findById(patient._id);
            expect(deletedPatient).toBeNull();
        });

        it('should return 404 if the patient with given ID does not exist', async () => {
            const response = await request(app).delete(`/api/patients/${new mongoose.Types.ObjectId()}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.msg).toBe('Patient not found');
        });
        
        it('should return 400 if the patient ID is invalid', async () => {
            const response = await request(app).delete(`/api/patients/invalidId`);
            expect(response.statusCode).toBe(400);
            expect(response.body.msg).toBe('Invalid ID');
        });
    })

    describe('PUT /:id', () => {
        it('should return 400 if the input data is invalid', async () => {
            const patient = new Patient({
                petName: 'Tom',
                petType: 'Cat',
                ownerName: 'Bilal',
                ownerAddress: 'Lahore',
                ownerPhone: '03051927417'
            });
            await patient.save();
            const response = await request(app)
                .put(`/api/patients/${new mongoose.Types.ObjectId()}`)
                .send({
                    petName: '', // invalid petName
                    petType: 'Cat',
                    ownerName: 'Bilal',
                    ownerAddress: 'Lahore',
                    ownerPhone: '03051927417'
                });

            expect(response.statusCode).toBe(400);
        });

        it('should return 404 if the patient does not exist', async () => {
            const response = await request(app)
                .put(`/api/patients/${new mongoose.Types.ObjectId()}`)
                .send({
                    petName: 'Tom',
                    petType: 'Cat',
                    ownerName: 'Bilal',
                    ownerAddress: 'Lahore',
                    ownerPhone: '03051927417'
                });
            console.log(response.body.msg)
            expect(response.statusCode).toBe(404);
            expect(response.body.msg).toBe('Patient not found');
        });

        it('should update the patient if the ID and data are valid', async () => {
            const patient = new Patient({
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
    
            const response = await request(app)
                .put(`/api/patients/${patient._id}`)
                .send(updatedData);
    
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe('Patient updated successfully');

            const patientInDb = await Patient.findById(patient._id);
            console.log(patientInDb);
            expect(patientInDb).toHaveProperty('petName', 'Thomas');
        });
    })

    afterEach(async() => {
        await Patient.deleteMany({});
    })
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    })
});