import express from 'express';
import patientsService  from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
    // res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    const newPatient = patientsService.addPatient({ 
        name, 
        dateOfBirth,
        gender,
        ssn,
        occupation
    });
    res.json(newPatient);
});

export default router;