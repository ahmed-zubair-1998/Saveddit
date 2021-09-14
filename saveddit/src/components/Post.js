import React from 'react'
import { useDispatch } from 'react-redux'

import { unsave } from '../reducers/savedDataReducer'


const getDateTimeString = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000)
    const dateString = date.toLocaleDateString("en", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
    const timeString = date.toLocaleTimeString("en")
    return `${dateString} - ${timeString}`
}


const Post = ({ post }) => {

    const dispatch = useDispatch()

    const unsavePost = (id, subreddit) => {
        dispatch(unsave(id, subreddit))
    }

    return (
        <div className="post bg-blue-200 text-blue-0 rounded-lg w-4/5 mx-auto px-1 py-3 my-5" key={post.url}>
            <div className="flex flex-col sm:flex-row space-y-1 items-center justify-between pb-2 mb-4 px-4 border-b-2 border-blue-500">
                <a className="bg-red-400 hover:bg-red-200 py-1 px-2 rounded-full hover:text-black" href={`https://www.reddit.com/r/${post.subreddit}`} target="_blank">
                    r/{post.subreddit}
                </a>
                <p>{getDateTimeString(post.created)}</p>
            </div>

            <div className="py-1 font-bold rounded-md cursor-pointer text-gold-100 hover:text-white bg-gradient-to-r hover:from-transparent hover:via-gold-200 hover:to-transparent" onClick={() => unsavePost(post['id'], post['subreddit'])}>
                Unsave
            </div>

            <div className="flex flex-col items-center space-y-4 hover:bg-blue-300 rounded-md w-full py-4 cursor-pointer" onClick={() => window.open(post.url, "_blank")}>
                {
                    post.image && <img className="pt-2 px-2" src={post.image} />
                }
                <div className="font-semibold text-xl py-1">
                    {post.title}
                </div>
            </div>

            <div className="py-3">
                <div className="grid grid-cols-3 items-center px-3 border-2 border-blue-500">
                    <div className="col-span-3 sm:col-span-1 py-1 ">
                        <a className="bg-red-400 hover:bg-red-200 py-1 px-2 rounded-full hover:text-black" href={`https://www.reddit.com/u/${post.author}`} target="_blank">
                            u/{post.author}
                        </a>
                    </div>
                    <div>karma: {post.score}</div>
                    <div className="col-start-3">Comments: {post.comments}</div>
                </div>
            </div>

            <div className="text-left px-3 pb-2">
                <p className="line-clamp-3">{post.text}</p>
            </div>
        </div>
    )
}

export default Post
