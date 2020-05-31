import React from 'react';

const Total = ({ course }) => {
    const parts = course.parts;

    const exercises = parts.map(el => el.exercises);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let total = exercises.reduce(reducer);

    return (
        <div>
            <p><em>Total sum of exercises in the course is: {total}</em></p>
        </div>
    )
}

export default Total;