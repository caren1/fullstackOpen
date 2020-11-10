/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from "react-dom";

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

interface Courses {
  courses: Array<{ name:string, exerciseCount: number }>
}

const Content: React.FC<Courses> = (props) => {
  return (
  <>
    {props.courses.map((course) => (
      <p key={course.name}>Name: {course.name},<br /> no. of exercises: {course.exerciseCount}</p>
    ))}
  </>
  )
}

const Total: React.FC<Courses> = (props) => {
  return (
    <>
    <p>Total number of exercises{" "}
        {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
    </>
  )
}



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header title={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));