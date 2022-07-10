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

	const deleteItem = (i) => {
		const delItem = todoList.filter((element, index) => index != i)
		settodoList(delItem)
	}

	return (
		<><div className="Home">
			<Header />
			<input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} />
			<button onClick={addItem}>Add</button>

		</div>
		<div>
			{todoList.map((item, index) => {
				return (
					<><div>
						{item}
					</div>
					<button onClick={() => deleteItem(index)}>Delete</button>
					</>
				)
			})}
		</div>
		<div>
			{todoList.length + " items left"}
		</div>
		</>
	);
};

export default Home;