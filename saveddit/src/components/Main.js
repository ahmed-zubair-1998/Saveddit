import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Window from './Window'
import { setSavedData } from '../reducers/savedDataReducer'
import { logout } from '../reducers/usernameReducer'


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

    return (
        <div>
            <h3>Hello u/{username}</h3>
            <button onClick={handleLogout}>Sign Out</button>
            {
                loaded
                ? <Window />
                : <p>Fetching data...</p>
            }
        </div>
    )
}

export default Main
