import './App.css';
import Card from './Card.js';
import Test from './Test.js';
import React, {useState, useRef, useEffect} from 'react';
import profileImg from './resources/profilePic2.png'

function App(props) {

  const [displayTheme, setDisplayTheme] = useState('light');

  function onChangeTheme(event){
      const button = document.getElementById("darkModeToggle");
      if(displayTheme === "light") {
        setDisplayTheme("dark")
        button.textContent = "light";
      }
      else{
        setDisplayTheme("light");
        button.textContent = "dark"; 
      }
  }

  return (
    <div className={displayTheme}>
      <header className="flex flex-row w-full place-content-end shadow-lg dark:bg-slate-800 dark:border-b-2 dark:border-white">   
      <div className="w-full dark:bg-slate-800 dark:text-white flex flex-row place-content-center">
        <img src={profileImg}/>
        <h1 className="m-auto p-5 dark:text-white text-7xl">TODO LIST</h1>
      </div>
          <div className="m-2 border-2 rounded-full border-black bg-slate-500">
            <button 
              onClick={onChangeTheme} 
              id="darkModeToggle" 
              className="dark:pt-16 dark:bg-white text-xl rounded-full py-1 px-1 bg-slate-800 text-white font-bold hover:shadow-lg transition transition-colors duration-500">
               {displayTheme === "light" ? "🌙" : "☀️"}
            </button>
        </div>
      </header>
      <div className="flex flex-row justify-between p-3 overflow-auto dark:bg-slate-800">
        <div className="flex flex-col">   
          <h2 className="dark:text-white font-bold">to-do</h2>   
          <Card />
          <Card />
        </div>
        <div className="flex flex-col">
        <h2 className="dark:text-white font-bold">in-progress</h2>
          <Card />
          <Card />
        </div>
        <div className="flex flex-col">
          <h2 className="dark:text-white font-bold">completed!</h2>
          <Card />
          <Card />
        </div>

      </div>
    </div>
  );
}

export default App;
