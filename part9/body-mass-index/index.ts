import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);

    if (!height || !weight) res.send({ error: 'one of the parameters is missing' });
    
    
    if (isNaN(height) || isNaN(weight)){
        res.send({ error: 'one of provided parameters is not a number' });
    } else {
        res.send({ weight, height, bmi, });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
