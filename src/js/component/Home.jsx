import React, { useState }  from "react";

//components
import Header from "./Header.jsx";
import List from "./List.jsx"

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState('');

	const [todoList, settodoList] = useState([]);

	const addItem = () => {
		const newList = [...todoList]
		newList.push(inputValue)
		settodoList(newList)
	}

	return (
		<div className="Home">
			<Header />
			<input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue}/>
			<button onClick={addItem}></button>
			<List todoList={todoList}/>
		</div>
	);
};

export default Home;