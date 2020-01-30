const { createStore } = require('redux');

const initialState = {
    age: 27
};

const myReducer = (state = initialState, action)=>{
    const newState = { ...state}
    if(action.type==="ADD"){
        newState.age+=1
    }
    if(action.type === "SUBTRACT"){
        newState.age -= 2
    }

    return newState;
}

const store = createStore(myReducer);
console.log(store.getState());
store.dispatch({ type: 'ADD'})
console.log(store.getState());
store.dispatch({ type:'SUBTRACT'})

console.log('====================================');
console.log(store.getState());
console.log('====================================');