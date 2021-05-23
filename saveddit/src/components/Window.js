import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'

import useField from '../hooks/useField'
import Pagination from './Pagination'


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
        if(searchField.value === ''){
            setFilteredPosts(posts.filter(post => post))
            return
        }
        let temp = fuse.current.search(searchField.value).map(item => {
            return item.item
        })
        setFilteredPosts(temp)
    }



    return (
        <div>
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
    )
}


export default Window
