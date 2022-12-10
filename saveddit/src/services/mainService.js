import api from './baseConfig'


export const getUsername = async () =>  {
    const response = await api.get('/api/username')
    const username = response.status === 200 ? response.data : ''
    return username
}

export const getData = async () => {
    const response = await api.get('/api/saved')
    let {subreddits, posts} = response.data
    return {
        subreddits: sort_subreddits(subreddits),
        posts: posts
    }
}

export const logoutUser = async () => {
    const response = await api.get('/api/logout')
    return response.data
}

export const getLoginLink = async () => {
    const response = await api.get('/api/login')
    return response.data
}

export const unsavePost = async (id) => {
    const response = await api.post(`/api/unsave/${id}`)
    return response.data
}

const sort_subreddits = subreddits => {
    let subredditsList = Object.keys(subreddits).map(key => {
        return [key, subreddits[key]]
    })
    subredditsList.sort((first, second) => {
        return second[1] - first[1]
    })
    return subredditsList
}
