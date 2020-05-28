import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <div><h1>{title}</h1></div>;

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const Statistic = ({text, count}) => <p>{text} {count}</p>;
  
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={'give feedback'} />
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <hr />
      <Header title={'statistics'} />
      <Statistic text={'good'} count={good} />
      <Statistic text={'neutral'} count={neutral} />
      <Statistic text={'bad'} count={bad} />
    </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);