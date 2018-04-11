const ws = require('ws');

const JANUS_SOCKET_PORT = 8188;
const JANUS_SOCKET_PATH = `ws://janus:${JANUS_SOCKET_PORT}`;
let id;

let s1 = {};
s1.socket = new ws(JANUS_SOCKET_PATH, 'janus-protocol');
s1.socket.on('open', () => console.log("opened"));
s1.socket.on('close', () => console.log("closed"));
s1.socket.on('message', (msg) => {
  msg = JSON.parse(msg)
  if (msg && msg.data && msg.data.id) {
    s1.id = msg.data.id;
  }
  console.log("message ", msg)
});
s1.socket.on('error', (err) => console.log("error ", err));

let s2 = {};
s2.socket = new ws(JANUS_SOCKET_PATH, 'janus-protocol');
s2.socket.on('open', () => console.log("opened"));
s2.socket.on('close', () => console.log("closed"));
s2.socket.on('message', (msg) => {
  console.log("message ", msg)
});
s2.socket.on('error', (err) => console.log("error ", err));


setTimeout(()=> {
  s1.socket.send(JSON.stringify({
    janus: 'create',
    transaction: '2',
  }))
  /*s1.send(JSON.stringify({
    janus: 'claim',
    transaction: '2',
    session_id: 1484209715552914,
  }))*/
}, 1000)

setTimeout(()=> {
  s1.socket.close()
  /*s1.send(JSON.stringify({
    janus: 'claim',
    transaction: '2',
    session_id: 1484209715552914,
  }))*/
}, 8000)

setTimeout(()=> {
  console.log(s1.id)
  s2.socket.send(JSON.stringify({
    janus: 'claim',
    transaction: '3',
    session_id: s1.id,
  }))
}, 10000)





setInterval(() => { console.log('nal') }, 50000);
