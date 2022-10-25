import React from 'react';
import {useState} from 'react';

function App() {
  const [name, setName] = useState("");

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log(name)
    const resp = await fetch("http://localhost:4000/qrcode/print", {
      method: 'POST', 
      mode: 'no-cors', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(name)
    })
    // const resp = await fetch("http://localhost:4000/", {
    //   method: 'GET', 
    //   mode: 'cors', 
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    // });

    setName("");
    console.log(resp.status)
  }

  return (
    <div>
      <form onSubmit={(e)=>{submitForm(e)}}>
        <label>Enter your name:
          <input type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </label>
        <button type='submit' >Submit</button>
      </form>    
    </div>
  );
}

export default App;
