import React, {useReducer} from 'react';

const initState = 0;

const reducer = (state, action) => {
    switch(action) {
        case 'UP': return state + 1;
        case 'DOWN': return state - 1;
        default: throw new Error(`Invalid action`);        
    }
}


function Count(props) {
    const [count, dispatch] = useReducer(reducer, initState);
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch('UP')}>Increase</button>
            <button onClick={() => dispatch('DOWN')}>Decrease</button>
        </div>
    );
}

export default Count;