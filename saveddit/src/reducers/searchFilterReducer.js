const searchFilterReducer = (state='', action) => {
    switch(action.type){
        case 'SET_SEARCH_QUERY':
            return action.data
        default:
            return state
    }
}

export const setSearchQuery = (queryString) => {
    return {
        type: 'SET_SEARCH_QUERY',
        data: queryString,
    }
}

export default searchFilterReducer
