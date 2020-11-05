/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
// import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full stack!');
});

// app.get('/bmi', (req, res) => {
//     const height = Number(req.query.height);
//     const weight = Number(req.query.weight);
    
//     if (!height || !weight) return res.status(400).json({ error: 'Height and Weight must be provided' });
    
//     if (isNaN(height) || isNaN(weight)){
//         return res.status(400).json({ error: 'Height and Weight must be numbers' });
//     } else {
//         const bmi:string = calculateBmi(height, weight);
//         res.json({ weight, height, bmi });
//     }
// });

app.post('/exercises', (req, res) => {
    const exercisesData = req.body;
    const dailyExercises = exercisesData.daily_exercises;
    const targetHours = exercisesData.target;

    if (exercisesData.length < 2) return res.status(400).json({ error: 'parameters missing' });
    if (isNaN(Number(targetHours))) return res.status(400).json({ error: 'Target hours must be a number' });

    const daysArray = dailyExercises.map((day: any) => {
        if (isNaN(Number(day))){
            return false;
        } else {
            return true;
        }
    });

    if (daysArray.includes(false)) return res.status(400).json({ error: 'Report must contain numbers' });

    return res.json(calculateExercises(dailyExercises, targetHours));

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
