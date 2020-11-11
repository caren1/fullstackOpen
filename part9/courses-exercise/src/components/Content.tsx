/* eslint-disable react/prop-types */
import React from 'react'
import Part from './Part';
import { CoursePart } from '../types';

const Content: React.FC<{ parts: Array<CoursePart> }> = ({ parts }) => {
    return (
    <>
      {parts.map((part, i) => (
          <Part key={i} part={part}/>
      ))}
    </>
    )
  }

export default Content
