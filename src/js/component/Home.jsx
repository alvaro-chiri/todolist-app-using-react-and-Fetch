import React, { useState, useEffect } from "react";

//components
import Header from "./Header.jsx";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const [todoList, settodoList] = useState([]);

  const addItem = () => {
    const newList = [...todoList];
    newList.push({ label: inputValue, done: false });
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alvaro-chiri", {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        }
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        alert(data.result); //this will print on the console the exact object received from the server
        fetchListItems();
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  };

  const deleteItem = (i) => {
    const updatedList = todoList.filter((element, index) => index != i);
    settodoList(updatedList);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alvaro-chiri", {
      method: "PUT",
      body: JSON.stringify(updatedList),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status == 200) {
        return resp.json();
      }
    });
  };

  useEffect(() => {
    fetchListItems();
  }, []);
  function createUser() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alvaro-chiri", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    });
  }
  function fetchListItems() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alvaro-chiri", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        }
      })
      .then((data) => {
        if (data != undefined) {
          settodoList(data); //here is were your code should start after the fetch finishes
        } else {
          createUser();
        }
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  function deleteAll() {
    const deletedList = [];
    settodoList(deletedList);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alvaro-chiri", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status == 200) {
        return resp.json();
      }
    });
  }

  return (
    <>
      <div className="Home">
        <Header />
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <div>
        {todoList.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.label}</div>
              <button onClick={() => deleteItem(index)}>X</button>
            </div>
          );
        })}
      </div>
      <div>{todoList.length + " items left"}</div>
      <button onClick={() => deleteAll()}> Clear List</button>
    </>
  );
};

export default Home;
