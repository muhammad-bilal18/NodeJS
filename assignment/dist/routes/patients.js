"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = require("../models/patient");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.get('/', async (_req, res) => {
    const patients = await patient_1.Patient.find().sort('name');
    res.status(200).json(patients);
});
router.post('/', async (req, res) => {
    const error = (0, patient_1.validatePatient)(req.body);
    if (error)
        return res.status(400).send({ 'msg': error.details[0].message });
    const patient = new patient_1.Patient({
        petName: req.body.petName,
        petType: req.body.petType,
        ownerName: req.body.ownerName,
        ownerAddress: req.body.ownerAddress,
        ownerPhone: req.body.ownerPhone
    });
    await patient.save();
    return res.status(200).send({ 'msg': `${patient.petName} added successfully`, 'newPatient': patient });
});
router.put('/:id', async (req, res) => {
    const error = (0, patient_1.validatePatient)(req.body);
    if (error)
        return res.status(400).send({ 'msg': error.details[0].message });
    const updatedPatient = await patient_1.Patient.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            petName: req.body.petName,
            petType: req.body.petType,
            ownerName: req.body.ownerName,
            ownerAddress: req.body.ownerAddress,
            ownerPhone: req.body.ownerPhone,
        }
    }, { new: true });
    if (!updatedPatient)
        return res.status(404).send({ 'msg': 'Patient not found' });
    return res.status(200).send({ 'msg': 'Patient updated successfully', 'updatedPatient': updatedPatient });
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(400).send({ msg: 'Invalid ID' });
    const patient = await patient_1.Patient.findByIdAndDelete({ _id: id });
    if (!patient)
        return res.status(404).send({ 'msg': 'Patient not found' });
    return res.status(200).send({ 'msg': `${patient.petName} deleted successfully`, 'deletedPatient': patient });
});
exports.default = router;
//# sourceMappingURL=patients.js.map