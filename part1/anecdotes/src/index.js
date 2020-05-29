import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({text}) => <div><h1>{text}</h1></div>;

const Statistic = ({votes}) => <p>has {votes} votes</p>

const App = ({anecdotes}) => {

  const generateRandomAnecdote = anecdotes => Math.floor(Math.random() * (anecdotes.length));

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})

  const increaseVoteNumber = (points, currentAnecdote) => {
    const pointsCopy = {...points};
    pointsCopy[currentAnecdote] = pointsCopy[currentAnecdote] + 1;
    setPoints(pointsCopy);
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <Statistic votes={points[selected]} />
      <Button onClick={() => setSelected(generateRandomAnecdote(anecdotes))} text={'next anecdote'} />
      <Button onClick={() => increaseVoteNumber(points, selected)} text={'vote'} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />,document.getElementById('root'))