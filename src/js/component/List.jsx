import React from "react";

const List = (props) => {
    return (
        <ul>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>{props.map()}</li>
        </ul>
    )
}

export default List;