const subredditsFilterReducer = (state=[], action) => {
    switch(action.type){
        case 'ADD_SUBREDDIT':
            return [...state, action.data]
        case 'REMOVE_SUBREDDIT':
            return state.filter(x => x !== action.data)
        default:
            return state
    }
}

export const selectSubreddit = (subreddit) => {
    return {
        type: 'ADD_SUBREDDIT',
        data: subreddit,
    }
}

export const unselectSubreddit = (subreddit) => {
    return {
        type: 'REMOVE_SUBREDDIT',
        data: subreddit,
    }
}

export default subredditsFilterReducer
