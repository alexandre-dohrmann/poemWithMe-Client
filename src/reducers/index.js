import { combineReducers } from "redux";


const initializeUsernameReducer = (state={}, action) => {

  switch (action.type) {
    case 'login/INITIALIZE_USERNAME':
        return action.username
    default:

      return state

  }
}


const handleChatReducer = (state={}, action) => {

  switch (action.type){
    case 'chat/UPDATE_CHAT_USERS':

       return {
            ...state,
            usernames: [...action.usernames]
        }
    case 'chat/ADD_CHAT_BOX':
       if(state.chatBoxes.indexOf(action.username) === -1){
           return {
            ...state,
            chatBoxes: [...state.chatBoxes, action.username],

          }
      } else {
        return {
            ...state,
            chatBoxes: [...state.chatBoxes],
          }

      }
    case 'chat/BOXES_OPEN':
      return {
        ...state,
        boxesOpen: true
      }
    case 'chat/BOXES_CLOSED':
      return {
        ...state,
        chatBoxes: [...state.chatBoxes.filter((user) => user !== action.user )]
      }
    case 'chat/PM':

      const msgObject = {
        from: action.username,
        recipient: action.recipient,
        message: action.message
      }

      return {
        ...state,
        prvMsgData: [...state.prvMsgData, msgObject]
      }

    case 'chat/UPDATE_PRV_MESSAGE':

      const newObj = {
        from: action.username,
        recipient: action.recipient,
        message: action.message
      }

      if(state.chatBoxes.indexOf(action.username) === -1){
           return {
            ...state,
            boxesOpen: true,
            chatBoxes: [...state.chatBoxes, action.username],
            prvMsgData: [...state.prvMsgData, newObj]
          }
      } else {
        return {
            ...state,
            boxesOpen: true,
            chatBoxes: [...state.chatBoxes],
            prvMsgData: [...state.prvMsgData, newObj]
          }

      }

    case 'chat/HANDLE_POEM_MODAL':

      return {
        ...state,
        poemModal: !state.poemModal
      }



    default:
      return state;
  }
}


const poemRoomReducer = (state={}, action) => {
  switch(action.type){
    case 'chat/HANDLE_POEM_PARTNER':
      return {
        ...state,
        poemPartner: action.partner
      }
    case 'poem/HANDLE_POEM_TEXT':
      return {
        ...state,
        userTextArea:  action.text
     }
    default:
      return state
  }
}





const messageReducer = (state={}, action) => {
  switch (action.type) {
    case 'login/ADD_RESPONSE':
      return {
        ...state,
        messages: [...action.message]
      }
     default:
        return state
  }
}


export default combineReducers({
  messages: messageReducer,
  username: initializeUsernameReducer,
  chat: handleChatReducer,
  poemRoom: poemRoomReducer
});
