const redux = require('redux')
const thunkMiddleware = require("redux-thunk").default
const axios = require('axios')
const reducerLogger = require('redux-logger')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reducerLogger.createLogger()

const initialState = {
    loading: false,
    photos : [],
    error:''
}

// API https://jsonplaceholder.typicode.com/photos
const FETCH_PHOTO_REQUEST = "FETCH_PHOTO_REQUEST";
const FETCH_PHOTO_SUCCESS = "FETCH_PHOTO_SUCCESS";
const FETCH_PHOTO_FAILURE = "FETCH_PHOTO_FAILURE";



//Actions
const fetchPhotoRequest = ()=>{
    return {
        type: FETCH_PHOTO_REQUEST
    }
}

const fetchPhotoSuccess = photos =>{
    return{
        type: FETCH_PHOTO_SUCCESS,
        payload: photos
    }
}

const fetchPhotoFailure = err =>{
    return {
        type: FETCH_PHOTO_SUCCESS,
        payload: err
    }
}

// Reducers
const photoReducers = (state=initialState, action)=>{
    switch(action.type){
        case FETCH_PHOTO_REQUEST:
            return {
                    ...state,
                    loading: true
            } 
        case FETCH_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photos: action.payload,
                error: ""
            }
        case FETCH_PHOTO_FAILURE:
            return {
                ...state,
                loading: false,
                photos: [],
                error: action.payload
            }
    }
}

const fetchPhotos = ()=>{
    return function(dispatch){
        dispatch(fetchPhotoRequest())
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response=>{
                const photos = response.data
                dispatch(dispatch(fetchPhotoSuccess(photos)))
            }).catch(err=>{
                dispatch(fetchPhotoFailure(err.message))
            })
    }
}

const store = createStore(photoReducers, applyMiddleware(thunkMiddleware))

store.subscribe(()=>{console.log(store.getState())})

store.dispatch(fetchPhotos())