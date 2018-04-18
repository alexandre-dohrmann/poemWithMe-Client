import { combineReducers } from "redux";


// const initialState = {
//   username: '',
//   messages: []
// }


const initializeUsernameReducer = (state, action) => {
  console.log(action, ' this is action in initialzieUsernameReducer')
  switch (action.type) {
    case 'INITIALIZE_USERNAME':
        return {
            ...state,
            username: action.username
        }
    default:

      return state

  }
}


const messageReducer = (state, action) => {

  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...action.messages]
      }
     default:
        return state
  }
}


export default combineReducers({
  message: messageReducer,
  initializeUsernameReducer,
});
