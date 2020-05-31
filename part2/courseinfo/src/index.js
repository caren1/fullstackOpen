import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

  const course = {
    id: 1,
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Rendering a collection of modules',
        exercises: 4,
        id: 4
      }
      
  ]
};

ReactDOM.render(<App course={course}/>, document.getElementById('root'));
