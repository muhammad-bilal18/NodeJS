import express, { Request, Response, NextFunction } from 'express';
import { Patient, validatePatient } from '../models/patient';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    const patients = await Patient.find().sort('name');
    res.status(200).json(patients);
});

router.post('/', async (req: Request, res: Response) => {
    const error = validatePatient(req.body);
    if (error) return res.status(400).send({ 'msg': error.details[0].message });

    const patient = new Patient({
        petName: req.body.petName,
        petType: req.body.petType,
        ownerName: req.body.ownerName,
        ownerAddress: req.body.ownerAddress,
        ownerPhone: req.body.ownerPhone
    });
    await patient.save();
    return res.status(200).send({ 'msg': `${patient.petName} added successfully`, 'newPatient': patient });
});

router.put('/:id', async (req: Request, res: Response) => {
    const error = validatePatient(req.body);
    if (error) return res.status(400).send({ 'msg': error.details[0].message });

    const updatedPatient = await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                petName: req.body.petName,
                petType: req.body.petType,
                ownerName: req.body.ownerName,
                ownerAddress: req.body.ownerAddress,
                ownerPhone: req.body.ownerPhone,
            }
        },
        { new: true }
    );

    if (!updatedPatient) return res.status(404).send({ 'msg': 'Patient not found' });
    return res.status(200).send({ 'msg': 'Patient updated successfully', 'updatedPatient': updatedPatient });
});

router.delete('/:id', async (req: Request, res: Response) => {
    const patient = await Patient.findByIdAndDelete({ _id: req.params.id });
    if (!patient) return res.status(404).send({ 'msg': 'Patient not found' });
    return res.status(200).send({ 'msg': `${patient.petName} deleted successfully`, 'deletedPatient': patient });
});

export default router;