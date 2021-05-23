import React, { useState, useEffect } from 'react'

import { getLoginLink } from '../services/mainService'


const Login = () => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const loginLink = await getLoginLink()
            setUrl(loginLink)
        }
        fetchData()
    }, [])

    return (
        <div>
            <p>Login to saveddit.</p>
            {
                url
                ? <a href={url}>Login</a>
                : ''
            }
        </div>
    )
}

export default Login
