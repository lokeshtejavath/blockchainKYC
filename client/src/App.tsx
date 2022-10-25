import React from "react";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<any>();
  const [isSelected, setisSelected] = useState(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resp = await fetch("http://localhost:4000/qrcode/print", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(name),
    });

    setName("");
    console.log(resp.status);
  };

  const changeHandler = (event: any) => {
    setFile(event.target.files[0]);
    setisSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

      formData.append('qr_image_file', file);

      fetch(
        'http://localhost:4000/qrcode/read',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };
    

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <form>
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {file.name}</p>
            <p>Filetype: {file.type}</p>
            <p>Size in bytes: {file.size}</p>
            <p>
              lastModifiedDate: {file.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
