import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga';

import useField from '../hooks/useField'
import { selectSubreddit, unselectSubreddit } from '../reducers/subredditsFilterReducer'


const Subreddit = ({ subreddit, toggleSelection, subredditClass }) => {
    return (
        <div className="p-4" onClick={() => toggleSelection(subreddit)}>
            <div className={`${subredditClass} border-4 p-4 rounded-full flex justify-between`}>
                <div className="grid grid-cols-4 w-full items-center">
                    <div className="col-span-3 break-words">{subreddit[0]}</div>
                    <div className="col-span-1 text-right">{subreddit[1]}</div>
                </div>
            </div>
        </div>
    )
}


const Subreddits = ({ subreddits }) => {

    const dispatch = useDispatch()
    const selectedSubreddits = useSelector(state => state.selectedSubreddits)
    const [showDetails, setShowDetails] = useState(false)
    const [filteredSubreddits, setFilteredSubreddits] = useState([...subreddits])

    const searchField = useField('text')
    const { reset, ...searchFieldTagProps } = searchField

    useEffect(() => {
        setFilteredSubreddits(subreddits.filter(x => {
            return x[0].toLowerCase().startsWith(searchField.value.toLowerCase())
        }))
    }, [searchField.value])

    useEffect(() => {
        setFilteredSubreddits([...subreddits])
    }, [selectedSubreddits])

    const handleSelection = (subreddit) => {
        ReactGA.event({
            category: 'Subreddit FIlter',
            action: 'Selected a Subreddit'
        });

        dispatch(selectSubreddit(subreddit))
    }

    const handleUnselection = (subreddit) => {
        ReactGA.event({
            category: 'Subreddit FIlter',
            action: 'Unselected a Subreddit'
        });
        
        dispatch(unselectSubreddit(subreddit))
    }

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
                        <input placeholder="Search" {...searchFieldTagProps} className="block text-black focus:ring-blue-200 focus:border-blue-200 w-full pl-7 pr-12 py-2 sm:text-sm border-blue-0 border-2 rounded-md" />
                    </div>
                </div>

                <div className="h-5/6 lg:overflow-y-auto pb-4">
                    <div className="Selected-Subreddits grid grid-cols-2 items-center">
                        {
                            selectedSubreddits.length ?
                                selectedSubreddits.map(subreddit => {
                                    return <Subreddit key={subreddit} subreddit={subreddit} toggleSelection={handleUnselection} subredditClass={"selected-subreddit"} />
                                }) :
                                ''

                        }
                    </div>
                    <div className="Unselected-Subreddits grid grid-cols-2 items-center">
                        {
                            selectedSubreddits.length ?
                                filteredSubreddits.reduce((arr, x) => {
                                    if (!selectedSubreddits.includes(x)) {
                                        arr.push(<Subreddit key={x} subreddit={x} toggleSelection={handleSelection} subredditClass={"unselected-subreddit"} />)
                                    }
                                    return arr
                                }, []) :
                                ''
                        }
                    </div>
                    {
                        selectedSubreddits.length ?
                            '' :
                            <div className="Subreddits grid grid-cols-2 items-center">
                                {
                                    filteredSubreddits.map(subreddit => {
                                        return <Subreddit key={subreddit} subreddit={subreddit} toggleSelection={handleSelection} subredditClass={"selected-subreddit"} />
                                    })
                                }
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Subreddits
