import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from "react-ga4";
import csvDownload from 'json-to-csv-export'

import Window from './Window'
import LoadingScreen from './LoadingScreen'
import { setSavedData } from '../reducers/savedDataReducer'
import { logout } from '../reducers/usernameReducer'
import Logo from '../../public/logo.png'


const Main = () => {
    const loaded = useSelector(state => state.loaded)
    const username = useSelector(state => state.username)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSavedData())
    }, [])

    const handleLogout = () => {
        ReactGA.event({
            category: 'Logout',
            action: 'User Logout'
        });

        dispatch(logout())
    }

    const handleDataExport = () => {
        ReactGA.event({
            category: 'Export Data as CSV',
            action: 'Export Data'
        });
        csvDownload({data: posts, filename: 'saveddit4reddit.csv'})
    }

    const [signOutButton, setSignOutButton] = useState('hidden')

    const toggleSignOutButton = () => {
        const newValue = signOutButton ? '' : 'hidden'
        setSignOutButton(newValue)
    }

    return (
        <div className="bg-blue-500 flex-1 flex flex-col text-blue-0 static lg:overflow-y-hidden cursor-default">
            <div className="bg-blue-400 shadow-lg h-16 py-3 px-6 flex justify-between items-center">
                <img className="h-8 sm:h-12 w-auto" src={Logo} alt="Saveddit" />
                <div className='flex flex-row gap-4'>
                    {
                        loaded && 
                        <button onClick={handleDataExport} className='hover:bg-blue-200 px-4 py-2 rounded-md text-sm sm:text-base'>
                            Export Data as CSV
                        </button>
                    }
                    <button onClick={toggleSignOutButton} className={`${signOutButton ? '' : 'bg-blue-200'} hover:bg-blue-200 px-4 py-2 rounded-md text-sm sm:text-base`}>
                        u/{username}
                    </button>
                </div>
            </div>
            <button className={`${signOutButton} mt-16 py-3 px-6 rounded-md bg-red-400 hover:bg-red-100 hover:shadow-2xl hover:text-black absolute right-6`} onClick={handleLogout}>
                Sign Out
            </button>
            <div className="flex-1 flex flex-col overflow-y-hidden">
                {
                    loaded
                        ? <Window />
                        : <LoadingScreen loggedIn={true} />
                }
            </div>
        </div>
    )
}

export default Main
