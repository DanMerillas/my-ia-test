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

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  }
  const handleKeyDownImagen = (event: any) => {
    if (event.key === 'Enter') {
      fetchDataImagen();
    }
  }



  return (
    <div className='container mx-auto'>
      
      {loading ? <LoadingSpinner /> : <>
      <h1 className='mt-12 mb-2 text-2xl font-black'>ChatGPT y Dall-e (OpenIA)</h1>
        <h2 className='mt-12 mb-2 text-xl'>Preguntas:</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className='col-span-2'>
            <textarea title='' placeholder='Introduce tu pregunta' onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} rows={4} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" value={inputText}/>
          </div>
          <div>
            <input type={'button'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' value="Enviar" onClick={fetchData} />
          </div>
        </div>

        {response !== "" && <><h1 className='mt-12 mb-2 text-xl'>Repuesta:</h1><p>{response}</p></>}

        <h2 className='mt-12 mb-2 text-xl'>Generar imágenes:</h2>
        <textarea title='' placeholder='Introduce la descripción de la imagen a crear' onChange={(e) => setinputTextImage(e.target.value)} onKeyDown={(handleKeyDownImagen)} rows={4} value={inputTextImage} className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" />
        
        <input type={'button'} value="Enviar" onClick={fetchDataImagen} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' />
        {responseImagen.length > 0 && <>
          <h2 className='mt-12 mb-2 text-xl'> Imagen:</h2>
          {responseImagen.map((i: any) =>
            <p>
              <img alt='' className='object-cover mb-4' src={i.url} />
            </p>
          )}
        </>}
      </>}
    </div>
  );
}

export default App;


