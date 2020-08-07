const notificationReducer = (state = 'this is an initial message', action) => {
    switch (action.type){
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const nofitificationChange = notification => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export default notificationReducer