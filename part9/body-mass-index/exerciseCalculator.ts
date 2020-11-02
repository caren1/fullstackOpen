interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

interface ExerciseValues {
    target: number,
    days: Array < number >
}

const daysFromArgs = (args: Array <string>) : Array<number> => {
    const daysArray: Array<number> = [];
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))){
            daysArray.push(Number(args[i]));
        }
    }
    return daysArray;
};

const parseExerciseArguments = (args: Array < string > ): ExerciseValues => {
    if (args.length < 10) throw new Error('Not enough arguments');
    // if (args.length > 10) throw new Error('Too many arguments');
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {

        return {
            target: Number(args[2]),
            // days: [Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9])]
            days: daysFromArgs(args),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateExercises = (days: Array < number > , target: number): Result => {

    const trainingDays = days.filter(day => day != 0);

    const averageTrainingTime = trainingDays.reduce((total, amount, index, array) => {
        total += amount;
        if (index === array.length - 1) {
            return total / array.length;
        } else {
            return total;
        }
    });

    const didTarget = averageTrainingTime <= target ? false : true;

    let personRating = 0;
    let personRatingDescription = '';

    if (averageTrainingTime > target) {
        personRatingDescription = 'You did a great job, keep it up!';
        personRating = 3;
    } else if (averageTrainingTime == target) {
        personRatingDescription = 'Great job, but maybe more next time?';
        personRating = 2;
    } else if (averageTrainingTime < target) {
        personRatingDescription = 'Move your ass and start working out seriously!';
        personRating = 1;
    }

    return {
        periodLength: days.length,
        trainingDays: trainingDays.length,
        target: target,
        average: averageTrainingTime,
        success: didTarget,
        rating: personRating,
        ratingDescription: personRatingDescription,
    };
};

// let userTrainingHours = [3, 0, 2, 4.5, 0, 3, 1];
// let userTrainingHours2 = [2, 2, 2, 2, 1, 0, 1];
// let userTrainingHours3 = [8, 0, 8, 0, 8, 0, 8];

// console.log(calculateExercises(userTrainingHours, 2));
// console.log(calculateExercises(userTrainingHours, 50));
// console.log(calculateExercises(userTrainingHours2, 1.6666666666666667));
// console.log(calculateExercises(userTrainingHours3, 1));

try {
    const { target, days } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(days, target));
} catch (e) {
    console.log('Error, something unexpected happened, message: ', e.message);
}