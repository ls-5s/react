import {useState} from 'react'
function App() {
  const [index,setIndex] = useState(0)
    function arr() {
      setIndex(index + 1)
  }
  return (
    <div>
    <button onClick={arr}> 点击； </button>
   <div>{index}</div>
</div>
  )
}

export default App
