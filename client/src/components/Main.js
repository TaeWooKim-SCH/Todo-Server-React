import {useState, useEffect} from 'react';


const Main = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [remove, setRemove] = useState("");

  const submitHandler = () => {
    fetch("http://localhost:4000/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({addData: text})
      })
      .then((res) => setText(""))
  }

  const inputHandler = (e) => {
    setText(e.target.value);
    console.log(text);
  }

  const removeHandler = (index) => {
    fetch('http://localhost:4000/remove', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data[index])
    });
    window.location.reload();
    
  }

  useEffect(() => {
    fetch('http://localhost:4000/data', {method: 'GET'})
    .then((res) => res.json())
    .then((data) => setData(data));
  }, [])

  return (
    <main className="todo-box">
      <h1>T O D O</h1>
      <form className="todo-form">
        <input className="todo-input" type='text' value = {text} onChange={(e) => inputHandler(e)}></input>
        <input className="submit-btn" type="submit" value="추가" onClick={submitHandler}></input>
      </form>
      <ul className="todo-list">
        {data.length ? data.map((x, idx) => 
        <>
          <li key={idx}>{x.todo}</li>
          <span className="remove" onClick={() => removeHandler(idx)}>x</span>
        </>) : <h2 className="not-exist">To Do isn't exist</h2>}
      </ul>
    </main>
  )
}

export default Main;