import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from './reducers/usernameReducer'

import Login from './components/Login'
import Main from './components/Main'


const App = () => {
    const dispatch = useDispatch()
    dispatch(setUsername())
    const username = useSelector(state => state.username)

    return (
        <div>
            {
                username === null
                    ? <p>Saveddit.....</p>
                    : (
                        username === '' 
                            ? <Login />
                            : <Main />
                    )
            }
        </div>
    )
}

export default App
