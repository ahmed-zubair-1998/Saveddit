import React, { useState } from 'react'


const Subreddits = ({ subreddits }) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="subreddits flex-1 flex flex-col overflow-y-hidden">
            <div className="bg-blue-200 h-14 p-3 flex items-center justify-between text-xl font-bold flex-shrink-0 border-t-2 border-blue-500">
                Subreddits
                <div className={`${showDetails ? 'hidden' : ''} lg:hidden`} onClick={() => { setShowDetails(!showDetails) }}>
                    <svg className="h-6 w-6 fill-current text-black hover:text-blue-0 rounded-full" viewBox="0 0 20 20">
                        <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                    </svg>
                </div>
                <div className={`${showDetails ? '' : 'hidden'} lg:hidden`} onClick={() => { setShowDetails(!showDetails) }}>
                    <svg className="h-6 w-6 fill-current text-black hover:text-blue-0 rounded-full" viewBox="0 0 20 20">
                        <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
                    </svg>
                </div>
            </div>
            <div className={`${showDetails ? '' : 'hidden'} lg:block font-medium flex flex-col flex-1 overflow-y-hidden`}>
                <div className="py-4 px-6 col-span-2 font-medium flex-shrink-0">
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input type="text" className="block text-black focus:ring-blue-200 focus:border-blue-200 w-full pl-7 pr-12 py-2 sm:text-sm border-blue-0 border-2 rounded-md" />
                        <button className="absolute inset-y-0 right-0 pr-7 flex items-center">
                            <svg className="h-5 w-6" viewBox="0 0 20 20">
                                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="h-5/6 lg:overflow-y-auto grid grid-cols-2 items-center">
                    {
                        subreddits.map(subreddit => {
                            return (
                                <div className="p-4" key={subreddit}>
                                    <div className="selected-subreddit border-4 p-4 rounded-full flex justify-between">
                                        <div className="grid grid-cols-4 w-full items-center">
                                            <div className="col-span-3 break-words">{subreddit[0]}</div>
                                            <div className="col-span-1 text-right">{subreddit[1]}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Subreddits
