import React, { useState, useEffect } from 'react'
import { asciiArt } from '../constants'

const Login = () => {
    const [lines, setLines] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [randomString, setRandomString] = useState('');

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setLines((prevLines) => [...prevLines, inputValue]);
        setInputValue('');
      }
    };
    
    // Random string stuff for reasons
    function generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }

    useEffect(() => {
      setRandomString(generateRandomString(32));
    }, [])

    console.log({randomString});

  return (
    <div className="flex flex-col items-center justify-start font-mono h-screen">
          <pre className="mt-20 text-[0.2rem] xs:text-[0.25rem] ss:text-[0.35rem] sm:text-[0.4rem] md:text-[0.5rem] text-t_green">{asciiArt}</pre>
          <div className="h-[60vh] flex flex-col justify-center">

            <form id="authForm" action="https://api.intra.42.fr/oauth/authorize" method="GET">
              <input type="hidden" name="client_id" value="YOUR_APP_UID_FOUND_ON_INTRA" />
              <input type="hidden" name="redirect_uri" value="http://localhost:5173/home" />
              <input type="hidden" name="response_type" value="code" />
              <input type="hidden" name="scope" value="public" />
              <input type="hidden" name="state" value={randomString} /> 
              <button type="submit" className="group relative h-12 w-48 overflow-hidden rounded-lg text-lg shadow border border-solid border-t_green hover:border-t_blue">
                <span className=" text-t_green group-hover:text-t_blue">Connect</span>
              </button>
            </form> 


          </div>

          {/* {lines.map((line, index) => (
          <div key={index} className="mt-4 flex items-center">
            <span className="text-t_green">Desktop:~$</span>
            <span className="pl-2 text-white">{line}</span>
          </div>
          ))}
          <div className="mt-4 flex items-center">
              <span className="text-t_green">Desktop:~$</span>
              <input
                type="text"
                className="flex-1 bg-transparent outline-none pl-2 text-white"
                placeholder="Enter login..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}    
              />
          </div> */}
    </div>
  )
}

export default Login