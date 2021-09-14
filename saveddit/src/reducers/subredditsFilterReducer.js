const subredditsFilterReducer = (state=[], action) => {
    switch(action.type){
        case 'ADD_SUBREDDIT':
            return [...state, action.data]
        case 'REMOVE_SUBREDDIT':
            return state.filter(x => x !== action.data)
        case 'RESET_SELECTED_SUBREDDITS':
            const previouslySelectedSubredditsNames = state.map(subreddit => subreddit[0])
            return action.data.filter(subreddit => previouslySelectedSubredditsNames.includes(subreddit[0]))
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

export const resetSelectedSubreddits = (subreddits) => {
    return {
        type: 'RESET_SELECTED_SUBREDDITS',
        data: subreddits,
    }
}

export default subredditsFilterReducer
