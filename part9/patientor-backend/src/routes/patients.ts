import express from 'express';
import patientsService  from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
    // res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    try {
        // console.log(req.params.id);
        const foundPatient = patientsService.getPatient(req.params.id);
        if (foundPatient) {
            res.json(foundPatient);
        }
    } catch (exception) {
        res.status(204).send(exception.message);
    }
});

router.post('/', (req, res) => {

    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientsService.addPatient(newPatientEntry);

        res.json(addedPatient);
    } catch (exception) {
        res.status(400).send(exception.message);
    }

});

export default router;