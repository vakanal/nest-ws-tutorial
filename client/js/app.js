new Vue({
  el: '#v-app',
  data: {
    title: 'WebSockets Tester',
    text: '',
    messages: ['Some message', 'Another message'],
    socket: null,
  },
  methods: {
    sendMessage() {
      console.log(`send: ${this.text}`);
      this.socket.emit('msgToSrv', this.text);
      this.text = '';
    },
    receiveMessage(msg) {
      console.log(`recv: ${msg}`);
      this.messages.push(msg);
    },
  },
  created() {
    this.socket = io('http://localhost:3001', { path: '/websockets' });
    this.socket.on('msgToClt', (msg) => {
      this.receiveMessage(msg);
    });
  },
});
