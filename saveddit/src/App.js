import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from './reducers/usernameReducer'

import Login from './components/Login'
import Main from './components/Main'
import LoadingScreen from './components/LoadingScreen'
import ReactGA from 'react-ga';


const App = () => {
    const dispatch = useDispatch()
    dispatch(setUsername())
    const username = useSelector(state => state.username)

    ReactGA.initialize('G-XWFGZL51TG');
    ReactGA.pageview(window.location.href);

    return (
        <div className="h-screen flex flex-col">
            {
                username === null
                    ? <LoadingScreen loggedIn={false}/>
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
