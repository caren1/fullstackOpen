import React from 'react';

const Total = ({ course }) => {
    const parts = course.parts;

    let total = 0;
    parts.forEach(element => {
        total += element.exercises;
    });

    return (
        <div>
            <p><em>Total sum of exercises in the course is: {total}</em></p>
        </div>
    )
}

export default Total;