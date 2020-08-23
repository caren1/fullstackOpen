const notificationReducer = (state = null, action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notificationReducer
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

    export const setNotification = (notification, timeout) => {
        return async dispatch => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification
            })
            setTimeout(() => {
                dispatch(removeNotification())
            }, timeout)
        }
    }

    export const removeNotification = () => {
        return {
            type: 'REMOVE_NOTIFICATION'
        }
    }

export default notificationReducer
