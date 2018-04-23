import io from 'socket.io-client';
import * as actions from './actions/message-actions';

let socket = null;

export function chatMiddleWare(store, what){
  return next => action => {
    console.log(action, 'action being dispatched')
    const result = next(action);
    if(socket && action.type === actions.INITIALIZE_USERNAME){
      // send socket emit message
      // console.log('inside if and action.type')
      const {username }= store.getState()

      socket.emit('setInitialUsername', username);
      action.route.history.push('/chat')
      // store.dispatch()
    } else if (socket && action.type === actions.PM) {
      console.log('else if in reduce emit emitPrivateMessage', action)
      socket.emit('pm', action.recipient, action.message)
    }

    return result;
  }
}



export default function(store) {
  socket = io.connect('http://localhost:4000');

  socket.on('updateUsers', (usernames) => {

    store.dispatch(actions.updateChatUsers(usernames));
  });


  socket.on('message', message => {
    store.dispatch(actions.addResponse(message));
  });
}
