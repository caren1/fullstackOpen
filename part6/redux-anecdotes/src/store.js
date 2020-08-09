import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'


const reducers = combineReducers({
    anecdotes: reducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
        )
    )

export default store
