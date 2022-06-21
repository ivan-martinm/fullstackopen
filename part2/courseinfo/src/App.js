const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((total, num) => total + num)
  return (
    <>
      {
        parts.map(part =>
          <Part key={part.id} part={part}
          />
        )
      }
        <Total sum={sum} />
    </>
  )
}

const Course = ({ course }) =>
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return <Course course={course} />
}

export default App