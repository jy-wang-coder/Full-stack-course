const Head = (props) => {
  console.log('head', props)
  return <h1>{props.name}</h1>
}

const Part = ({part}) => {
  // console.log('part', part)
  return(
  <p>{part.name} {part.exercises}</p>
  )
}

const Content = (props) => {
  console.log('Content')
  // console.log('Content parts', props.parts)
  return (
      <p>
        {props.parts.map(part => 
          <Part key = {part.id} part = {part}/>
        )}
      </p>
  )
}

const Total = (props) => {
  console.log('total works')
  const total = props.parts.reduce((s, p) => {
    console.log('what is happening', s, p.exercises)
    return s + p.exercises
  },0)
  return <p> Total of {total} exercises</p>
  }


const Course = (props) => {
  console.log('Course props',props);
  const name = props.course.name
  const parts = props.course.parts
  console.log('Course name',name);
  console.log('Course parts',parts);
  return(
  <div>
    <Head name={name}/>
    <Content parts={parts} />
    <Total parts={parts}/>
  </div>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course =>
      <Course key = {course.id} course = {course}/>
      )
      }
    </div>
)
}

export default App
