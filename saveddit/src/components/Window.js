import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'

import useField from '../hooks/useField'
import Pagination from './Pagination'
import SearchPanel from './SearchPanel'
import Subreddits from './Subreddits'


const Window = () => {
    const posts = useSelector(state => state.savedData.posts)
    const subreddits = useSelector(state => state.savedData.subreddits)
    const searchField = useField('text')
    const [filteredPosts, setFilteredPosts] = useState(posts)
    const fuse = useRef(null)

    useEffect(() => {
        if (!filteredPosts) {
            return
        }
        const options = {
            shouldSort: true,
            findAllMatches: true,
            threshold: 0.2,
            ignoreLocation: true,
            keys: [
                {
                    name: 'title',
                    weight: 2
                },
                {
                    name: 'text',
                    weight: 1
                }
            ]
        }
        const myIndex = Fuse.createIndex(options.keys, filteredPosts)
        fuse.current = new Fuse(filteredPosts, options, myIndex)
    }, [])

    const handleSearch = (event) => {
        event.preventDefault()
        if (!fuse.current) {
            console.log('You have no existing saved post. Nothing to search...')
            return
        }
        if (searchField.value === '') {
            setFilteredPosts(posts.filter(post => post))
            return
        }
        let temp = fuse.current.search(searchField.value).map(item => {
            return item.item
        })
        setFilteredPosts(temp)
    }



    return (
        <div className="lg:flex lg:flex-1 lg:overflow-y-hidden">

            <div className="lg:w-1/3 bg-green-300 flex flex-col overflow-y-hidden">
                <SearchPanel />

                <Subreddits subreddits={subreddits}/>
            </div>

            <div className="main lg:w-2/3 text-gray-50 overflow-y-auto">
                <div className="info flex flex-col space-y-1">
                    <div className="text-center p-3">
                        <div className="font-semibold text-lg">
                            <div className="bg-gray-700 rounded-md py-2">
                                Filters
                            </div>
                        </div>
                        <p className="pt-3">No search query</p>
                        <p>Number of subreddits selected : 4</p>
                        <p>Number of total posts : 73</p>
                    </div>
                </div>

                <div className="text-center font-semibold text-lg p-3">
                    <div className="bg-gray-700 rounded-md py-2">
                        Posts
                    </div>
                </div>

                <div className="posts text-center px-4 py-5">

                    <Pagination list={filteredPosts} />
            
                </div>
            </div>


        </div>
    )
}


export default Window

/*
<div className="lg:w-2/3">
                <h1>Search your feelings...</h1>
                <form onSubmit={handleSearch}>
                    <input {...searchField} />
                    <button type='submit'>Search</button>
                </form>



                <h2>Posts</h2>
                <Pagination list={filteredPosts} />


                <h2>Subreddits</h2>
                <ol>
                    {
                        subreddits.map(subreddit => (
                            <li key={subreddit[0]}>{subreddit[0]} : {subreddit[1]}</li>
                        ))
                    }
                </ol>
            </div>

*/