import patientData from '../../data/patietnts';
import { Patient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): Array<Omit<Patient, 'ssn'>> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};


const addPatient = () => {
    return null;
};

export default {
    getPatients,
    addPatient,
    getNonSensitivePatients
};