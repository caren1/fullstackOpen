import blogService from '../services/blogs'
import { createNotifiation } from './notificationReducer'

const blogReducer = (state = [], action) => {
    
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data

        case 'ADD_NEW_BLOG':
            return [...state, action.data]

        default :
            return state
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const response =  await blogService.getAll()
        const sortedBlogs = response.sort((a, b) => b.likes - a.likes)
        dispatch({
            type: 'INIT_BLOGS',
            data: sortedBlogs
        })   
    }
}

export const addBlog = (content) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(content)
                dispatch({
                    type: 'ADD_NEW_BLOG',
                    data: newBlog
                })
            dispatch(createNotifiation(`Added a new blog ${newBlog.title}, by ${newBlog.author}`, 'success'))
        
        }catch (error){
            dispatch(createNotifiation(error.message, 'error'))
        }
    }
}

export default blogReducer