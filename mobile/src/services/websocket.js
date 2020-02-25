import socketio from 'socket.io-client';

const socket = socketio('http://10.0.0.100:3333', {
  autoConnect: true,
});

function loadLikes(post) {
  socket.on('like', post);
}
function loadPost(post) {
  socket.on('post', post);
}

export {loadLikes, loadPost};
