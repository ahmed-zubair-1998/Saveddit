import React, { useState, useEffect } from 'react'

import { getLoginLink } from '../services/mainService'
import Logo from '../public/logo.png'


const Login = () => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const loginLink = await getLoginLink()
            setUrl(loginLink)
        }
        fetchData()
    }, [])

    return (
        <div className="bg-blue-400 flex-1 text-blue-0">
            <div className="bg-blue-500 h-16">
                <img className="h-12 w-auto pt-3 pl-3" src={ Logo } alt="Saveddit" />
            </div>
            <div className="container mx-auto mt-20 flex flex-col justify-center py-4 px-8 rounded-sm shadow-2xl h-96">
                <ul className="list-none list-outside bg-blue-300 pl-8 py-16 text-lg font-semibold tracking-wider leading-loose">
                    <li>View all the posts you have saved on Reddit</li>
                    <li>Search for keywords to filter your saved posts</li>
                    <li>View the count of posts saved per subreddit</li>
                    <li>Filter your posts saved based on subreddits</li>
                </ul>
                <div className="p-4 w-auto bg-red-300">
                    {
                        url
                        ? <a className="font-bold hover:bg-red-400 shadow-lg py-3 px-4" href={url}>Login with Reddit</a>
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
