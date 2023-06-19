import './Card.css';
import React, {useState} from 'react';
import _uniqueId from 'lodash/uniqueId';

function Card(props) {

	const [title, setTitle] = useState(props.title);
	const [description, setDescription] = useState(props.description);

	function handleOnChangeBody(event){
		setDescription(event.target.value);
	}

	function handleOnChangeTitle(event) {
		setTitle(event.target.value);
	}

	function handleClearCard(){
		setTitle("");
		setDescription("");
		props.onCreateNew(_uniqueId('prefix-'), title, description);
	}

	return (
		<div className="dark:bg-slate-700 bg-white rounded-xl shadow-lg w-96 h-96 flex flex-col mt-5 mb-5">
			<div className="m-5 h-full flex flex-col justify-evenly">
				<div className="text-xl mb-2 hover:border-blue-500">
					<input value={title} onChange={handleOnChangeTitle} className="dark:bg-slate-600 dark:text-white w-full p-1 border-l-2 border-blue-500 hover:border-blue-700 focus:outline-none" placeholder="Title for todo"/>
				</div>
				<div className="w-full h-4/6">
			      <textarea 
			        id="myTextArea" 
			        placeholder="Enter the body"
			        value={description}
			        onChange={handleOnChangeBody}
			        className="dark:bg-slate-600 dark:text-white w-full h-full m-auto p-1 resize-none focus:outline-none border-l-2 border-blue-500 focus:border-l-2 hover:border-blue-700"
			      />
			    </div>
				<div className="w-full y-1/6">
					{ props.type !== "newTodo" ? 
						( <div className="w-full y-full flex flex-col justify-evenly">
							<button onClick={() => props.onDone(props.id, props.type)} className="mt-2 mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded transition-colors duration-500"> {props.type === "todoCard" ? "Begin Progress" :  "mark as completed"}</button>
							<button onClick={()=>{props.onDelete(props.id, props.type)}}className="bg-red-400 rounded hover:bg-red-600 text-white font-bold py-1 px-4 transition-colors duration-500"> delete </button>
						</div> ) :
						(<div className="w-full y-full flex flex-col justify-evenly">
						<button onClick={handleClearCard} className="mt-2 mb-1 bg-lime-500 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded transition-colors duration-500"> + Create New </button>						
						</div> )
					}
				</div>
			</div>
		</div>
	)
}

export default Card;