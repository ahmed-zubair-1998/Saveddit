import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga';

import { getLoginLink } from '../services/mainService'


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
            <h1 className="sm:text-6xl text-4xl font-bold text-red-400 pl-16 pt-4">Saveddit</h1>
            <div className="flex flex-1">
                <div className="md:w-2/3 w-full">
                    <div className="bg-gradient-to-r from-blue-300 to-blue-400 mx-8 mt-8 p-8 text-lg font-semibold space-y-4">
                        <h2>View the posts that you have saved on your Reddit account</h2>
                        <h2>Search for keywords to filter through your saved posts</h2>
                        <h2>Filter your posts saved based on subreddits</h2>
                        <h2>View the count of posts saved per subreddit</h2>
                    </div>
                    <div className="bg-gradient-to-r from-blue-300 to-blue-400 border-t-4 border-blue-200 mx-8 p-8 text-lg font-semibold space-y-4">
                        <h3>Your account information nor any other Reddit data is saved on our server</h3>
                        <h3>View source code / Raise issue or request a feature - <ReactGA.OutboundLink eventLabel="Github Repo Click" to="https://github.com/ahmed-zubair-1998/Saveddit" target="_blank" className="text-blue-100 underline hover:text-blue-200">Github</ReactGA.OutboundLink></h3>
                    </div>
                    <div className="mx-8 mb-8 px-4 py-6 w-auto bg-gradient-to-r from-red-300 to-blue-400 md:text-left text-center">
                        {
                            url
                                ? <ReactGA.OutboundLink className="font-bold border-4 border-red-200 bg-red-400  hover:bg-red-200 py-3 px-4" to={url} eventLabel='Login Button Click'>Login with Reddit</ReactGA.OutboundLink>
                                : ''
                        }
                    </div>
                </div>
                <div className="hidden md:flex md:w-1/3 items-center content-center">
                    <svg className="h-4/5 w-4/5 fill-current text-red-400 mx-auto mt-4" viewBox="0 0 20 20">
                        <path transform="scale(-1, 1) translate(-20, 0)" d="M19.629,9.655c-0.021-0.589-0.088-1.165-0.21-1.723h-3.907V7.244h1.378V6.555h-2.756V5.866h2.067V5.177h-0.689V4.488h-1.378V3.799h0.689V3.11h-1.378V2.421h0.689V1.731V1.294C12.88,0.697,11.482,0.353,10,0.353c-5.212,0-9.446,4.135-9.629,9.302H19.629z M6.555,2.421c1.522,0,2.756,1.234,2.756,2.756S8.077,7.933,6.555,7.933S3.799,6.699,3.799,5.177S5.033,2.421,6.555,2.421z"></path>
                        <path transform="scale(-1, 1) translate(-20, 0)" d="M12.067,18.958h-0.689v-0.689h2.067v-0.689h0.689V16.89h2.067v-0.689h0.689v-0.689h-1.378v-0.689h-2.067v-0.689h1.378v-0.689h2.756v-0.689h-1.378v-0.689h3.218c0.122-0.557,0.189-1.134,0.21-1.723H0.371c0.183,5.167,4.418,9.302,9.629,9.302c0.711,0,1.401-0.082,2.067-0.227V18.958z"></path>
                    </svg>
                </div>


            </div>
        </div>
    )
}

export default Login
