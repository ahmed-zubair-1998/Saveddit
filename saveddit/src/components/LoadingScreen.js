import React from 'react'
import ReactGA from "react-ga4";

import Logo from '../../public/logo.png'


const LoadingScreen = ({loggedIn}) => {

    if(loggedIn){
        ReactGA.event({
            category: 'Login Approximation',
            action: 'Fetching Screen Launched'
        });
    }

    return (
        <div className="bg-blue-500 text-white flex-1 flex flex-col justify-center items-center">
            <img className="lg:h-1/2 h-1/4 w-1/2" src={Logo} />
            <span className="text-center p-4">
                Search and Filter through your <span className="text-red-200">Saved Reddit</span> Posts
            </span>
            <div className="flex sm:flex-row flex-col py-4 text-2xl font-bold tracking-widest flex items-center">
                <div className="text-blue-0 animate-bounce">
                    {
                        loggedIn ? 'Fetching your Data' : 'Loading'
                    }
                </div>
                <div className="py-1 flex">
                    <svg className="animate-bounce pl-3 h-8 w-8 fill-current text-red-400" viewBox="0 0 20 20">
                        <path d="M10,0.562c-5.195,0-9.406,4.211-9.406,9.406c0,5.195,4.211,9.406,9.406,9.406c5.195,0,9.406-4.211,9.406-9.406C19.406,4.774,15.195,0.562,10,0.562 M10,18.521c-4.723,0-8.551-3.829-8.551-8.552S5.277,1.418,10,1.418s8.552,3.828,8.552,8.551S14.723,18.521,10,18.521"></path>
                    </svg>
                    <svg className="animate-bounce pl-3 h-8 w-8 fill-current text-red-400" viewBox="0 0 20 20">
                        <path d="M10,0.531c-5.229,0-9.469,4.239-9.469,9.469S4.771,19.469,10,19.469s9.469-4.239,9.469-9.469S15.229,0.531,10,0.531 M11.128,18.525c-0.371,0.049-0.745,0.082-1.128,0.082c-4.754,0-8.608-3.854-8.608-8.607S5.246,1.392,10,1.392c0.383,0,0.758,0.034,1.128,0.083c1.976,2.269,3.176,5.281,3.176,8.525S13.103,16.257,11.128,18.525"></path>
                    </svg>
                    <svg className="animate-bounce pl-3 h-8 w-8 fill-current text-red-400" viewBox="0 0 20 20">
                        <path d="M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.223,4.235,9.459,9.458,9.459c5.224,0,9.458-4.236,9.458-9.459C19.459,4.776,15.225,0.542,10,0.542 M8.923,18.523C4.685,17.992,1.402,14.383,1.402,10c0-4.383,3.283-7.993,7.521-8.524C6.919,3.749,5.701,6.731,5.701,10C5.701,13.27,6.919,16.25,8.923,18.523"></path>
                    </svg>
                    <svg className="animate-bounce pl-3 h-8 w-8 fill-current text-red-400" viewBox="0 0 20 20">
                        <path d="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"></path>
                    </svg>
                </div>
            </div>
            <span>This may take a minute or two :)</span>
        </div>
    )
}

export default LoadingScreen
