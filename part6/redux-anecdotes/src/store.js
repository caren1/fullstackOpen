import { createStore } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'


const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store
