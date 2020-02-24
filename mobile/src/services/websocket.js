import socketio from 'socket.io-client';

const socket = socketio('http://localhost:3333', {
  autoConnect: true,
});

function loadLikes(post) {
  socket.on('like', post);
}
function loadPost(post) {
  socket.on('post', post);
}

export {loadLikes, loadPost};
