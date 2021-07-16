import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Window from './Window'
import LoadingScreen from './LoadingScreen'
import { setSavedData } from '../reducers/savedDataReducer'
import { logout } from '../reducers/usernameReducer'
import Logo from '../public/logo.png'


const Main = () => {
    const loaded = useSelector(state => state.savedData.loaded)
    const username = useSelector(state => state.username)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSavedData())
    }, [])

    const handleLogout = () => {
        dispatch(logout())
    }

    const [signOutButton, setSignOutButton] = useState('hidden')

    const toggleSignOutButton = () => {
        const newValue = signOutButton ? '' : 'hidden'
        setSignOutButton(newValue)
    }

    return (
        <div className="bg-gray-700 min-h-screen h-full text-gray-50 static">
            <div className="bg-gray-800 h-16 py-3 px-6 flex justify-between items-center">
                <img className="h-12 w-auto" src={ Logo } alt="Saveddit" />
                <button onClick={toggleSignOutButton} className="hover:bg-gray-600 px-4 py-2 rounded-md">
                    u/{username}
                </button>
            </div>
            <button className={`${signOutButton} py-3 px-6 rounded-md bg-red-300 text-gray-800 hover:text-gray-50 hover:bg-red-600 absolute right-6`} onClick={handleLogout}>
                Sign Out
            </button>
            {
                loaded
                ? <Window />
                : <LoadingScreen />
            }
        </div>
    )
}

export default Main
