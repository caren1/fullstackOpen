const calculateBmi = (height: number, weight: number): string => {
    let bmi =  Math.floor((weight / (height * height)) * 10000);
    console.log(bmi);
    

    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi > 15 && bmi <= 16 ){
        return 'Severely underweight';
    } else if (bmi <= 16 && bmi <= 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25) {
        return 'Overweight';
    } else if (bmi > 35) {
        return 'Severly Obese';
    }

}

console.log(calculateBmi(178, 75));
