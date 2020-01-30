const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore; 
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAMS = 'BUY_ICECREAMS'

function buyCake(){
    return{
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIcecreams(){
    return{
        type: BUY_ICECREAMS
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 20
// }

const CakeInitialState = {
    numOfCakes: 10
}

const IceCreameInitialState = {
    numOfIcecreams: 20
}


// const reducer = (state = initialState, action) =>{
//     switch(action.type){
//         case BUY_CAKE: 
//             return {
//                 ...state,
//                 numOfCakes:state.numOfCakes -1
//             }
//         case BUY_CAKE: 
//             return {
//                 ...state,
//                 numOfIcecreams:state.numOfIcecreams -1
//             }
//         default:
//             return  state
            
//     }
// }

const cakeReducer = (state = CakeInitialState, action) =>{
    switch(action.type){
        case BUY_CAKE: 
            return {
                ...state,
                numOfCakes:state.numOfCakes -1
            }
        default:
            return  state
            
    }
}


const iceCreameReducer = (state = IceCreameInitialState, action) =>{
    switch(action.type){
        case BUY_CAKE: 
            return {
                ...state,
                numOfIcecreams:state.numOfIcecreams -1
            }
        default:
            return  state
            
    }
}

const rootReducers = combineReducers({
    cake: cakeReducer,
    icecreame: iceCreameReducer
})

const store = createStore(rootReducers, applyMiddleware(logger))

const unsubscribe = store.subscribe(()=>{})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecreams())
unsubscribe()
