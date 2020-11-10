/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseStringField(object.name),
        dateOfBirth: parseDateField(object.dateOfBirth),
        ssn: parseStringField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseStringField(object.occupation),
    };
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringField = (field: any): string => {
    if (!field || !isString(field)){
        throw new Error('Incorrect or missing field: ' + field);
    }
    return field;
};


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateField = (date: any): string => {
    if (!date || !isDate(date) || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender field' + gender);
    }
    return gender;
};

export default toNewPatientEntry;