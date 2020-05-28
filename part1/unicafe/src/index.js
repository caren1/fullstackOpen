import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <div><h1>{title}</h1></div>;

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const Statistic = ({text, count}) => {
  
  if(text ==='positive percentage'){
    return <p>{text} {count}%</p> 
  }else{
    return <p>{text} {count}</p>
  }

}

const Statistics = ({good, neutral, bad}) => {

  // const Statistics = ({counts}) => {
  // const good = counts[0];
  // const neutral = counts[1];
  // const bad = counts[2];

  const countAverage = function(a, b, c){
    let total = a + b + c;
    let average = ((a * 1) + (b * 0) + (c * -1)) / total;
    return Math.floor(average);
  }

  const countPercentage = function(a, b, c){
    let total = a + b + c;
    let percentage = (a/total) * 100;
    return Math.floor(percentage);
  }

  return(
  <div>
    <Statistic text={'good'} count={good} />
    <Statistic text={'neutral'} count={neutral} />
    <Statistic text={'bad'} count={bad} />
    <Statistic text={'all'} count={good + neutral + bad} />

    <Statistic text={'average'} count={countAverage(good, neutral, bad)} />
    <Statistic text={'positive percentage'} count={countPercentage(good, neutral, bad)} />
  </div>
  )

}
  
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
      {/* <Statistic text={'good'} count={good} /> */}
      {/* <Statistic text={'neutral'} count={neutral} /> */}
      {/* <Statistic text={'bad'} count={bad} />  */}
      {/* <Statistics counts={good, neutral, bad} /> */}
      {/* whoops, actually done the next exercise without reading it :) */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);