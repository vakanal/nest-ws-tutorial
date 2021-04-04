Vue.component('alerts-component', VueSimpleNotify.VueSimpleNotify);

new Vue({
  el: '#v-app',
  data: {
    username: '',
    text: '',
    messages: {
      general: [],
      typescript: [],
      nestjs: [],
    },
    rooms: {
      general: false,
      typescript: false,
      nestjs: false,
    },
    alerts: [],
    activeRoom: 'general',
    socket: { chat: null, alerts: null },
  },
  methods: {
    sendChatMessage() {
      if (this.isMemberOfActiveRoom) {
        this.socket.chat.emit('chatToServer', {
          sender: this.username,
          message: this.text,
          room: this.activeRoom,
        });
        this.text = '';
      } else {
        alert('You must be a member of the active room to send messages!');
      }
    },
    receiveChatMessage(msg) {
      this.messages[msg.room].push(msg);
    },
    receiveAlertMessage(msg) {
      this.alerts.push(msg);
    },
    toggleRoomMembership() {
      if (this.isMemberOfActiveRoom) {
        this.socket.chat.emit('leaveRoom', this.activeRoom);
      } else {
        this.socket.chat.emit('joinRoom', this.activeRoom);
      }
    },
  },
  computed: {
    isMemberOfActiveRoom() {
      return this.rooms[this.activeRoom];
    },
  },
  created() {
    this.username = prompt('Enter your username:');

    this.socket.chat = io('http://localhost:3000/chat');
    this.socket.chat.on('chatToClient', (msg) => {
      this.receiveChatMessage(msg);
    });
    this.socket.chat.on('connect', () => {
      this.toggleRoomMembership();
    });
    this.socket.chat.on('joinedRoom', (room) => {
      this.rooms[room] = true;
    });
    this.socket.chat.on('leftRoom', (room) => {
      this.rooms[room] = false;
    });

    this.socket.alerts = io('http://localhost:3000/alerts');
    this.socket.alerts.on('alertToClient', (msg) => {
      this.receiveAlertMessage(msg);
    });
  },
});
