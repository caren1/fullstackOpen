import loginService from '../services/login'
import blogService from '../services/blogs'

import { createNotifiation } from '../reducers/notificationReducer'

const defaultUser = { id: null, name: null, token: null, username: null }

const userReducer = (state = defaultUser, action) => {

    switch (action.type){

        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return defaultUser
    
        default :
            return state
    }
}

export const onLogin = ({ username, password }) => {
    return async dispatch => {
        console.log('logging in with following credentials:', username, password);
        try {
            const user = await loginService.login({ username, password })
            if (user) {
                dispatch(onAlreadyLogged(user))
            dispatch(createNotifiation(`Successfully logged in the user ${username}`, 'success'))
            }
        }catch (error) {
            dispatch(createNotifiation(`Could not log in, provided invalid credentials`, 'error'))
        }
    }
}

export const onAlreadyLogged = (user) => {
    return async (dispatch) => {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const onLogout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogUser')
        blogService.setToken(null)
        dispatch({ type: 'LOGOUT' })
    }
}

export default userReducer