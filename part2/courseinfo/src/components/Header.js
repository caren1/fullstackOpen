import React from 'react';

const Header = ({ course }) => {
    return (
      <div>
        <h1>Course: {course.name}</h1>
      </div>
    )
};

  export default Header;