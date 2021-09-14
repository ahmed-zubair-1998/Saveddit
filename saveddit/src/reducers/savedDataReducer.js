import { getData, unsavePost } from "../services/mainService"


export const loadReducer = (state=false, action) => {
    switch(action.type) {
        case 'SET_SAVED_DATA':
            return true
        default:
            return state
    }
}


export const postsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_SAVED_DATA':
            return [...action.data.posts]
        case 'UNSAVE_POST':
            return state.filter(post => post.id !== action.data.postId)
        default:
            return state
    }
}


export const subredditsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_SAVED_DATA':
            return [...action.data.subreddits]
        case 'UNSAVE_POST':
            return state.map(subreddit => subreddit[0] === action.data.subreddit ? [subreddit[0], subreddit[1]-1] : subreddit)
        default:
            return state
    }
}


export const setSavedData = () => {
    return async dispacth => {
        const response = await getData()
        dispacth({
            type: 'SET_SAVED_DATA',
            data: {
                ...response,
                loaded: true
            }
        })
    }
}


export const unsave = (postId, subreddit) => {
    unsavePost(postId)
    return {
        type: 'UNSAVE_POST',
        data: {
            postId,
            subreddit,
        },
    }
}
