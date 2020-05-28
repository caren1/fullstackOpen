import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <tr><th><h1>{text}</h1></th></tr>;

const Button = ({onClick, text}) => <tr><td ><button onClick={onClick}>{text}</button></td></tr>;

const Statistic = ({text, count}) => { return (text ==='positive percentage' ?  <tr><td><p>{text} {count}%</p></td></tr> : <tr><td ><p>{text} {count}</p></td></tr> )}
// const Statistic = ({text, count}) => {
//    if(text ==='positive percentage'){
//      return <tr><td><p>{text} {count}%</p></td></tr>
//    } 
//      return <tr><td ><p>{text} {count}</p></td></tr>
//   }

const Statistics = ({good, neutral, bad}) => {

  const countAverage = function(good, neutral, bad){
    let total = good + neutral + bad;
    let average = ((good * 1) + (neutral * 0) + (bad * -1)) / total;
    return average;
  }

  const countPercentage = function(good, neutral, bad){
    let total = good + neutral + bad;
    let percentage = (good/total) * 100;
    return Math.floor(percentage);
  }

  if(!(good || neutral || bad)) return <tr><td><p>No feedback given yet</p></td></tr>
  
    return(
      <div>
        <Statistic text={'Good feedback:'} count={good} />
        <Statistic text={'Neutral feedback:'} count={neutral} />
        <Statistic text={'Bad feedback:'} count={bad} />
        <Statistic text={'Total review count:'} count={good + neutral + bad} />
        <Statistic text={'Average:'} count={countAverage(good, neutral, bad)} />
        <Statistic text={'Positive percentage'} count={countPercentage(good, neutral, bad)} />
      </div>
      )
}
  
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedbackTitle = 'Give Feedback please';
  const statisticsTitle = 'Statistics:'

  return (
    <div>
      <table>
        <tbody>
        <Header text={feedbackTitle} />
        <tr >
        <Button onClick={() => setGood(good + 1)} text={'good'} />
        <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button onClick={() => setBad(bad + 1)} text={'bad'} />
        </tr>
        <Header text={statisticsTitle} />
        <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));