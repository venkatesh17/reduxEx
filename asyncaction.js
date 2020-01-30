const redux = require('redux')
const thunkMiddleware = require("redux-thunk").default
const axios = require('axios')
const reducerLogger = require('redux-logger')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reducerLogger.createLogger()

//constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

const initialsState = {
    loading: false,
    users: [],
    error: ''
}

// Actions
const fetchUserRequest = ()=>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = users=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserError = err =>{
    return {
        type: FETCH_USERS_FAILURE,
        payload: err
    }
}

// Reducers
const reducer = (state = initialsState, action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS: 
            return {
                loading: false,
                users: action.payload,
                error: ""
            }
        case FETCH_USERS_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
                .then( response=>{
                    const users = response.data
                    dispatch(fetchUserSuccess(users))
                }).catch(error=>{
                    dispatch(fetchUserError(error.message))
                })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(()=>{console.log("*******************",store.getState()) } )
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
store.dispatch(fetchUsers())