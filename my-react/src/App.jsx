

function App() {
  function arr() {
    alert("hhhhhhhhhhhh")
  }
  return (
    <div>
    <button onClick={arr}> 点击； </button>
    <button onClick={() => {
  alert('你点击了我！');
}}></button>
</div>
  )
}

export default App
