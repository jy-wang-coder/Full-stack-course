import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setcountry] = useState([])
  const [input, setinput] = useState([])


  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const data = response.data
      console.log('already get data')
      console.log({data})
      setcountry(data.reduce(d =>
        d.name, [])
      )
      console.log({country})
      })
    },[])

  const handleChange = (event) =>{
    setinput(event.target.value)
  }

  const onSearch = (event) =>{
    event.preventDefault() //precent the automomatic rerender when the form submit
    console.log('button click')

  }

  return (
  <div>
    <form onSubmit={onSearch}>
      Find countries: <input value={input} onChange={handleChange}/>
      <button type='submit'> search </button>
    </form>
  </div>
  );
}

export default App;
