import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          Name: {part.name} : no. of exercises: {part.exerciseCount} : <br/> {part.description}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          Name: {part.name} :  no. of exercises: {part.exerciseCount} : <br/> {part.exerciseSubmissionLink} <br/>
          {part.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
         Name: {part.name} :  no. of exercises: {part.exerciseCount} : {part.groupProjectCount}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;