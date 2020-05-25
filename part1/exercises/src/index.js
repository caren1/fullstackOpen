import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>Course: {props.course}</h1>
    </div>
  )
};

const Content = (props) => {

  return (
    <div>
      <div>
        <p>
          Part of the course: {props.parts[0]} <br/>
          Number of exercises: {props.exercises[0]}
        </p>
      </div>
      <div>
        <p>
          Part of the course: {props.parts[1]} <br/>
          Number of exercises: {props.exercises[1]}
        </p>
      </div>
      <div>
        <p>
          Part of the course: {props.parts[2]} <br/>
          Number of exercises: {props.exercises[2]}
        </p>
      </div>
    </div>
  )
};


const Total = (props) => {
  let total = 0;

  for (let i = 0; i < props.exercises.length; i++){
    let exercise = props.exercises[i];
     total += exercise;
  }
  
  return (
    <div>
      <p>Total number of exercises: {total}</p>
    </div>
  )
};

const App = () => {

  const course = 'Half stack application development';

  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const parts = [part1, part2, part3];
  const exercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises}/>
      <Total exercises={exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));