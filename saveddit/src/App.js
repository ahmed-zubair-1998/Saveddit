import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from "react-ga4";

import { setUsername } from './reducers/usernameReducer'
import Login from './components/Login'
import Main from './components/Main'
import LoadingScreen from './components/LoadingScreen'
import { authorizeReddit, getUsername } from './services/mainService';


const App = () => {
    ReactGA.initialize('G-DZLR763R28')
    const useQuery = () => new URLSearchParams(window.location.search)
    const dispatch = useDispatch()

    const setUser = async () => {
        const username = await getUsername()
        dispatch(setUsername(username))
    }

    const authorize = async (code) => {
        await authorizeReddit(code)
        window.history.pushState({}, document.title, window.location.pathname);
        await setUser()
    }

    let code = useQuery().get('code')
    if(code){
        authorize(code)
    } else {
        setUser()
    }

    const username = useSelector(state => state.username)

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
