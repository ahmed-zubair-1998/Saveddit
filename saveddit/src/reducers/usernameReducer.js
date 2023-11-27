const usernameReducer = (state=null, action) => {
    switch(action.type){
        case 'SET_USERNAME':
            return action.data
        default:
            return state
    }
}

export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        data: username
    }  
}

export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: 'SET_USERNAME',
        data: ''
    
    }
}

export default usernameReducer
