import './Card.css';
import React, {useState} from 'react';

function Card(props) {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	function handleOnChangeBody(event){
		setDescription(event.target.value);
	}

	function handleOnChangeTitle(event) {
		setTitle(event.target.value);
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
					<div className="w-full y-full flex flex-col justify-evenly">
						<button className="mt-2 mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded transition-colors duration-500"> done </button>
						<button className="bg-red-400 rounded hover:bg-red-600 text-white font-bold py-1 px-4 transition-colors duration-500"> delete </button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card;