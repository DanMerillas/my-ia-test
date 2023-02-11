import { useState } from 'react';

import './App.css';
import LoadingSpinner from './LoadingSpinner';


function App() {

  const [response, setResponse] = useState("");
  const [responseImagen, setResponseImagen] = useState<any>({});
  const [inputText, setInputText] = useState("");
  const [inputTextImage, setinputTextImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setResponseImagen({})
    setLoading(true)
    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : ''
      },
      body: JSON.stringify({
        prompt: inputText,
        model: "text-davinci-003",
        max_tokens: 4000,
        temperature: 0
      })
    });
    const data = await res.json();
    setLoading(false)
    setResponse(data.choices[0].text);

  }

  async function fetchDataImagen() {
    setResponse('')
    setLoading(true)
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : ''
      },
      body: JSON.stringify({
        prompt: inputTextImage,
        n: 4,
        size: "512x512"
      })
    });
    const data = await res.json();
    setLoading(false)
    setResponseImagen(data.data);
  }

  const handleKeyDown = (event:any)=>{
    if (event.key === 'Enter') {
      fetchData();
    }
  } 
  const handleKeyDownImagen = (event:any)=>{
    if (event.key === 'Enter') {
      fetchDataImagen();
    }
  } 



  return (
    <div className='App'>
      {loading ? <LoadingSpinner /> : <>
      <h1>Preguntas:</h1>
      <input type={'text'} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} /><input type={'button'} value="Enviar" onClick={fetchData} />
      {response !== "" && <><h1>Repuesta:</h1><p>{response}</p></>}

      <h1>Genera imágenes:</h1>
      <input type={'text'} onChange={(e) => setinputTextImage(e.target.value)} onKeyDown={(handleKeyDownImagen)}/><input type={'button'} value="Enviar" onClick={fetchDataImagen} />
      {responseImagen.length > 0 && <><h1> Imagen:</h1>
      {responseImagen.map((i:any)=><p><img alt='' src={i.url} /></p>)}
      </>}
      </>}
    </div>
  );
}

export default App;


