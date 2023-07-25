import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactGA from "react-ga4";

import useField from '../hooks/useField'
import { setSearchQuery } from '../reducers/searchFilterReducer'


const SearchPanel = () => {

    const dispatch = useDispatch()
    const [showDetails, setShowDetails] = useState(false)
    const searchField = useField('text')
    const { reset, ...searchFieldTagProps } = searchField


    const handleSearch = () => {
        ReactGA.event({
            category: 'Search',
            action: 'Filter Posts by Search Query'
        });

        dispatch(setSearchQuery(searchField.value))
    }

    const handleReset = () => {
        ReactGA.event({
            category: 'Search',
            action: 'Reset Search Query'
        });

        reset()
        dispatch(setSearchQuery(''))
    }

    return (
        <div className="search">
            <div className="bg-blue-200 text-blue-0 h-14 p-3 flex items-center justify-between text-xl font-bold border-t-2 border-blue-500">
                Search
                <div className={`${showDetails ? 'hidden' : ''} lg:hidden`} onClick={() => setShowDetails(true)}>
                    <svg className="h-6 w-6 text-black hover:text-blue-0 rounded-full fill-current" viewBox="0 0 20 20">
                        <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                    </svg>
                </div>
                <div className={`${showDetails ? '' : 'hidden'} lg:hidden toggle-2-2`} onClick={() => setShowDetails(false)}>
                    <svg className="h-6 w-6 text-black hover:text-blue-0 rounded-full fill-current" viewBox="0 0 20 20">
                        <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
                    </svg>
                </div>
            </div>
            <div className={`${showDetails ? '' : 'hidden'} lg:block py-4 px-6 bg-sky-100 block font-medium`}>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input {...searchFieldTagProps} className="block text-black focus:ring-blue-200 focus:border-blue-200 w-full pl-7 pr-12 py-2 sm:text-sm border-blue-0 border-2 rounded-md" />
                </div>
                <div className="flex flex-row-reverse text-blue-0 text-lg pt-2">
                    <button className="bg-blue-300 hover:bg-blue-200 py-2 px-4 rounded-md hover:text-black ml-4" onClick={handleSearch}>
                        Search
                    </button>
                    <button className="bg-blue-300 hover:bg-blue-200 py-2 px-4 rounded-md hover:text-black" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchPanel
