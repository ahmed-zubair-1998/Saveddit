import { getData } from "../services/mainService"


const initialSavedData = {
    posts: [],
    subreddits: [],
    loaded: false
}

const savedDataReducer = (state=initialSavedData, action) => {
    switch(action.type){
        case 'SET_SAVED_DATA':
            return action.data
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

export default savedDataReducer
