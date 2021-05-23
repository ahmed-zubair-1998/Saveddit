import { getUsername, logoutUser } from '../services/mainService'


const usernameReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_USERNAME':
            return action.data
        default:
            return state
    }
}

export const setUsername = () => {
    return async dispatch => {
        const username = await getUsername()
        dispatch({
            type: 'SET_USERNAME',
            data: username
        
        })
    }   
}

export const logout = () => {
    return async dispatch => {
        const username = await logoutUser()
        dispatch({
            type: 'SET_USERNAME',
            data: ''
        
        })
    }  
}

export default usernameReducer
