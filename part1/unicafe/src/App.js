import { useState } from 'react'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>
    {text}
  </button>

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {total === 0 ? 0 : (good - bad) / total}</p> {/*Using condition to prevent NaN from division by 0*/}
      <p>positive {total === 0 ? 0 : (good / total) * 100} %</p> {/*Using condition to prevent NaN from division by 0*/}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
