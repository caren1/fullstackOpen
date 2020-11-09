import patientData from '../../data/patients';
import { Patient, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = (): Array<Omit<Patient, 'ssn'>> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addPatient = ( entry: NewPatientEntry ): Patient => {
    
    const newPatient = {
        id: String(Math.max(patients.length) + 1),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient,
    getNonSensitivePatients
};