import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({text}) => <h2>"{text}"</h2>;

const Statistic = ({votes}) => <p>has {votes} votes</p>

const Header = ({text}) => <h1>{text}</h1>

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));
  const pointsCopy = [...points];

  const generateRandomAnecdote = () => setSelected(Math.floor(Math.random() * (anecdotes.length)));

  const increaseVoteNumber = () => {
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  }

  const topAnecdoteVotes = Math.max(...points);
  const topAnecdote = points.indexOf(topAnecdoteVotes);

  return (
      <>
        {/* which way is better? to separate the each of below to separate components,
         or just those required and write the rest via JSX without extracting to components */}

        <Header text={'Anecdote of the day:'} />
        <Anecdote text={anecdotes[selected]} />
        <Statistic votes={points[selected]} />
        <Button onClick={generateRandomAnecdote} text={'next anecdote'} />
        <Button onClick={increaseVoteNumber} text={'vote'} />
        <hr/>
        <Header text={'Anecdote with most votes'} />
        <Anecdote text={anecdotes[topAnecdote]} />
        <Statistic votes={topAnecdoteVotes} />
      </>

        /* ???????????? */
        /* <>
           <h1>Anecdote of the day:</h1>
           <h2>{anecdotes[selected]}</h2>
           <p>{points[selected]}</p>
           <Button onClick={generateRandomAnecdote} text={'next anecdote'} />
           <Button onClick={increaseVoteNumber} text={'vote'} />
           <h1>Anecdote with most votes:</h1>
           <h2>{anecdotes[topAnecdote]}</h2>
           <p>{topAnecdoteVotes}</p> 
           </>*/
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