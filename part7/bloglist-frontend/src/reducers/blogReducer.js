import blogService from '../services/blogs'
import { createNotifiation } from './notificationReducer'

const blogReducer = (state = [], action) => {
    
    switch (action.type) {
        case 'INIT_BLOGS': {
            return action.data
        }

        case 'ADD_NEW_BLOG': {
            return [...state, action.data]
        }
        
        case 'DELETE_BLOG':{
            return state.filter(blog => blog.id !== action.data.id)
        }

        case 'UPDATE_LIKE': { 
            const blogToUpdate = state.find(blog => blog.id === action.data.id)
            const patchedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
            return state.map(blog => blog.id === action.data.id ? patchedBlog : blog)
        }

        case 'ADD_COMMENT': {
            const blogToUpdate = state.find(blog => blog.id === action.data.id)
            const patchedBlog = { ...blogToUpdate, comments: blogToUpdate.comments.concat(action.data.comment)}
            return state.map(blog => blog.id === action.data.id ? patchedBlog : blog)
        }

        default : {
            return state
        }
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

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        try {
            const blogToDelete = await blogService.remove(blog)
                dispatch({
                    type: 'DELETE_BLOG',
                    data: { id: blog.id }
                })
                dispatch(createNotifiation(`Successfully removed ${blog.title}`, 'success'))
            
        }catch (error) {
            dispatch(createNotifiation(error.message, 'error'))
        }
    }
}

export const updateLike = (blog) => {
    return async (dispatch) => {
        try {
            const patchedBlog = {...blog, likes: blog.likes + 1 }
            const response = await blogService.update(patchedBlog)
            if (response) {
                dispatch({
                    type: 'UPDATE_LIKE',
                    data: { id : blog.id }
                })
                dispatch(createNotifiation(`liked ${patchedBlog.title}`, 'success'))
            }     
        }catch (error) {
            dispatch(createNotifiation(error.message, 'error'))
        }
    }
}

export const addComment = (blog, comment) => {
    return async (dispatch) => {
        try {
            const response = await blogService.addComment(blog, { comment })
            if(response){
                dispatch({
                    type: 'ADD_COMMENT',
                    data: { id: blog.id, comment }
                })
                dispatch(createNotifiation(`added comment ${comment} for ${blog.title}`, 'success'))
            }
        }catch(error){
            dispatch(createNotifiation(error.message, 'error'))
        }
    }
}

export default blogReducer