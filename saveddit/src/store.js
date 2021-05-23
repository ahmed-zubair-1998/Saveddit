import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import usernameReducer from './reducers/usernameReducer'
import savedDataReducer from './reducers/savedDataReducer'


const reducer = combineReducers({
    username: usernameReducer,
    savedData: savedDataReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
