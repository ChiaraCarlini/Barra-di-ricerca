import { useEffect, useState, useRef } from "react";
import Immagini from "./Immagini";
import Titolo from "./Titolo";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function App() {
  const [data, setData] = useState([]);
  const nome = useRef("nome");
  console.log(nome)
  const [mostra, setMostra] = useState("");
  

  function sceglimemes() {
  
    setMostra(nome.current.value);
    console.log(nome.current.value);
  }

  function controllo(stringa) {
    let mostramodificato=(mostra.toLowerCase());
    let stringaminuscola=stringa.toLowerCase();
    let elemento = stringaminuscola.split(" ");
    let i;
    for (i = 0; i < elemento.length; i++) {

      if (mostramodificato === elemento[i] || mostramodificato === stringaminuscola) {
        return true;
      } else {
        let partestringa = "";

        for (i = 0; i < stringaminuscola.length; i++) {
          partestringa = partestringa + stringa.charAt(i);
          partestringa= partestringa.toLowerCase();
         
          if (partestringa===mostramodificato) {
            return true;
          }
        }
        return false;
      }
    }
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((json) => setData(json.data.memes)); //METTE L'OGGETTO JSON NELLA VARIABILE DATA
  }, [mostra]);

  return (
    <div>
      <form>
        <label>Nome:</label>
    {/*   <input type="text" ref={nome}></input>
        <button onClick={sceglimemes}>Clicca</button>*/}
      </form>
      <Autocomplete
        id="memes"
        options={data.map((options) => options.name)}
        renderInput={(params) => <TextField {...params} label="memes" inputRef={nome} onChange={sceglimemes} />} 
      
      />
      <div>
        <p>Il nome è {mostra}</p>
      </div>
      <div>
      <ul>
        {data.map((elemento) =>
          controllo(elemento.name) || mostra === "" ? (
            <li key={elemento.id}>
              <Titolo name={elemento.name}></Titolo>
              <Immagini url={elemento.url}></Immagini>
            </li>
          ) : null
        )}
      </ul>
      </div>
    </div>
  );
}
