interface BmiValues {
    value1: number,
    value2: number
}

const parseArguments = (args: Array<string>) : BmiValues => {
    if (args.length < 4 ) throw new Error('Not enough arguments');
    if (args.length > 4 ) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string => {
    let bmi =  Math.floor((weight / (height * height)) * 10000);
    console.log(bmi);
    
    let bmiResult:string = '';

    if (bmi < 15) {
        bmiResult = 'Very severely underweight';
    } else if (bmi > 15 && bmi <= 16 ){
        bmiResult = 'Severely underweight';
    } else if (bmi >= 16 && bmi <= 18.5) {
        bmiResult = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiResult = 'Normal (healthy weight)';
    } else if (bmi >= 25) {
        bmiResult = 'Overweight';
    } else if (bmi > 35) {
        bmiResult = 'Severly Obese';
    }
    return bmiResult
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    // calculateBmi(value1, value2);
    
    console.log(calculateBmi(value1, value2));
} catch (e) {
    console.log('Error, something unexpected happened, message: ', e.message);
}

export { calculateBmi };
