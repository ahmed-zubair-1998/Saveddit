import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'

import Pagination from './Pagination'
import SearchPanel from './SearchPanel'
import Subreddits from './Subreddits'


const Window = () => {
    const posts = useSelector(state => state.savedData.posts)
    const subreddits = useSelector(state => state.savedData.subreddits)
    const [filteredPosts, setFilteredPosts] = useState(posts)
    const fuse = useRef(null)
    const [queryString, setQueryString] = useState('')

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

    const filterPosts = (searchQuery) => {
        setQueryString(searchQuery)
        if (!fuse.current) {
            console.log('You have no existing saved post. Nothing to search...')
            return
        }
        if (searchQuery === '') {
            setFilteredPosts([...posts])
            return
        }
        let temp = fuse.current.search(searchQuery).map(item => {
            return item.item
        })
        setFilteredPosts(temp)
    }



    return (
        <div className="lg:flex lg:flex-1 lg:overflow-y-hidden">

            <div className="lg:w-1/3 bg-blue-100 flex flex-col overflow-y-hidden">
                <SearchPanel filterPosts={filterPosts}/>

                <Subreddits subreddits={subreddits}/>
            </div>

            <div className="main lg:w-2/3 text-blue-0 overflow-y-auto">
                <div className="info flex flex-col space-y-1">
                    <div className="text-center p-3">
                        <div className="font-semibold text-lg">
                            <div className="bg-blue-300 rounded-md py-2">
                                Filters
                            </div>
                        </div>
                        <p className="pt-3">
                            {
                                queryString ?
                                `Searching for: ${queryString}` :
                                'No search query'
                            }                            
                        </p>
                        <p>Number of subreddits selected : 4</p>
                        <p>Number of total posts : {filteredPosts.length}</p>
                    </div>
                </div>

                <div className="text-center font-semibold text-lg p-3">
                    <div className="bg-blue-300 rounded-md py-2">
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
