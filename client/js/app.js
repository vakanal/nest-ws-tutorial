Vue.component('alerts-component', VueSimpleNotify.VueSimpleNotify);

new Vue({
  el: '#v-app',
  data: {
    username: '',
    text: '',
    messages: [],
    alerts: [],
    socket: { chat: null, alerts: null },
  },
  methods: {
    sendChatMessage() {
      this.socket.chat.emit('chatToServer', {
        sender: this.username,
        message: this.text,
      });
      this.text = '';
    },
    receiveChatMessage(msg) {
      this.messages.push(msg);
    },
    receiveAlertMessage(msg) {
      this.alerts.push(msg);
    },
  },
  created() {
    this.username = prompt('Enter your username:');

    this.socket.chat = io('http://localhost:3000/chat');
    this.socket.chat.on('chatToClient', (msg) => {
      this.receiveChatMessage(msg);
    });

    this.socket.alerts = io('http://localhost:3000/alerts');
    this.socket.alerts.on('alertToClient', (msg) => {
      this.receiveAlertMessage(msg);
    });
  },
});
