import './App.css';
import Card from './Card.js';
import Test from './Test.js';
import React, {useState, useRef, useEffect} from 'react';
import profileImg from './resources/profilePic3.png';
import { isCompositeComponent } from 'react-dom/test-utils';

function App(props) {

  const [displayTheme, setDisplayTheme] = useState('light');

  const [inProgressCards, setInProgressCards] = useState([]);
  const [todoCards, setTodoCards] = useState([{id:"1", type:"todoCard", title:"xya", description:"zakuwefhf", onDone:{handleOnDone}, onDelete:{handleDelete}, onCreateNew:{handleCreateNew}}]);
  const [completedCards, setCompletedCards] = useState([]);

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

  function handleOnDone(index, type){
    if(type === "todoCard"){
      const componentInProgress = todoCards.filter(todoCard => todoCard.id === index);
      const updatedTodoCards = todoCards.filter(todoCard => todoCard.id !== index);
      setTodoCards(updatedTodoCards);
      componentInProgress[0].type = "inProgressCard"; 
      setInProgressCards([...inProgressCards,componentInProgress[0]]);
    }
    else if(type === "inProgressCard"){
      const componentInProgress = inProgressCards.filter(inProgressCard => inProgressCard.id === index);
      const updatedTodoCards = inProgressCards.filter(inProgressCard => inProgressCard.id !== index);      
      componentInProgress[0].type = "Completed"; 
      setInProgressCards(updatedTodoCards);
      setCompletedCards([...completedCards,componentInProgress[0]]);
    }
    else{
      const updatedTodoCards = completedCards.filter(completedCard => completedCard.id !== index);      
      setCompletedCards(updatedTodoCards);
    }
  }

  function handleDelete(index, type){
    if(type === "todoCard"){
      const updatedTodoCards = todoCards.filter(todoCard => todoCard.id !== index);
      setTodoCards(updatedTodoCards);
    }
    else if(type === "inProgressCard"){
      const updatedTodoCards = inProgressCards.filter(inProgressCard => inProgressCard.id !== index);  
      setInProgressCards(updatedTodoCards);
    }
    else{
      const updatedTodoCards = completedCards.filter(completedCard => completedCard.id !== index);      
      setCompletedCards(updatedTodoCards);
    }
  }

  function handleCreateNew(newIndex, newTitle, newDescription){
    const newCard = {id:newIndex, type:"todoCard", title:newTitle, description:newDescription, onDone:{handleOnDone}, onDelete:{handleDelete}, onCreateNew:{handleCreateNew}};
    setTodoCards([...todoCards, newCard]);  
  }  


  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Comforter&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      </style>
      <div className={displayTheme}>         
        <header className="flex flex-row place-content-end shadow-lg dark:bg-slate-800 dark:border-b-2 dark:border-white">  
        <div className="w-full dark:bg-slate-800 dark:text-white flex flex-row place-content-center">     
          <h1 id="pageHeading" className="p-auto m-0 font-myFont m-auto p-5 dark:text-white text-3xl">Todo List</h1>
        </div>
            <div className="m-2 border-2 rounded-full border-black bg-slate-500">
              <button 
                onClick={onChangeTheme} 
                id="darkModeToggle" 
                className="dark:pt-6 dark:bg-white text-xl rounded-full py-1 px-1 bg-slate-800 text-white font-bold hover:shadow-lg transition transition-colors duration-500"
                alt={displayTheme}
                >
                {displayTheme === "light" ? "🌙" : "☀️"}
              </button>
          </div>
        </header>       
        <div className="flex flex-row min-h-screen justify-between p-3 overflow-auto dark:bg-slate-800">
          <div className="flex flex-col items-center w-1/3">  
          <h2 className="dark:text-white font-bold text-center">to-do</h2>
          <Card type={"newTodo"} onCreateNew={handleCreateNew}/>                
           {todoCards.map(card => (
              <Card id={card.id} type={card.type} title={card.title} description={card.description} onDone={handleOnDone} onDelete={handleDelete} />
           ))}
          </div>
          <div className="flex flex-col items-center w-1/3">       
          <h2 className="dark:text-white font-bold w-full text-center">in-progress</h2>      
            {inProgressCards.map(card => (
              <Card id={card.id} type={card.type} title={card.title} description={card.description} onDone={handleOnDone} onDelete={handleDelete}/>
           ))}
          </div>
          <div className="flex flex-col items-center w-1/3">
          <h2 className="dark:text-white font-bold min-w-96 text-center">completed!</h2>
            {completedCards.map(card => (
                <Card id={card.id} type={card.type} title={card.title} description={card.description} onDone={handleOnDone} onDelete={handleDelete}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
