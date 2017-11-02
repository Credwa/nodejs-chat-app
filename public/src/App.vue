<template>
  <div id="app">
    <div class="messages">
      <md-layout md-align="center" md-column>
        <div v-for="message in messageList" :key="message.from">
          <div style="float:left">
            <span>{{message.from}} :</span>
            <md-chip style="margin-bottom: 1.5rem;" class ="md-primary" v-if="!message.location">{{message.text}}</md-chip>
            <md-chip style="margin-bottom: 1.5rem;" class ="md-primary" v-if="message.location"><a :href="`https://www.google.com/maps?q=${message.text}`" target="_blank">My Location</a></md-chip>
          </div>
        </div>
      </md-layout>
    </div>
    <div class="footer">
        <form novalidate @submit.stop.prevent="submit" >
          <md-input-container>
            <label>Message</label>
            <md-input v-model="message.text"></md-input>
            <md-button class="md-primary md-raised" @click="submit" :disabled="!onMessageType">Send</md-button>
              <md-button class="md-primary md-raised" @click="sendLocation"><md-icon>my_location</md-icon></md-button>

          </md-input-container>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userName: "",
      message: {
        from: "Anon",
        text: "",
        createdAt: null
      },
      messageList: []
    };
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
      this.userName = "Anon" + Math.ceil(Math.random() * 1000);
      this.message.from = this.userName;
    },
    disconnect: function() {
      console.log("Disconnected");
    },
    newMessage: function(message) {
      console.log("newMessage", message);
      this.messageList.push(message);
    },
    newLocationMessage: function(message) {
      message.location = true;
      this.messageList.push(message);
    }
  },
  methods: {
    submit: function() {
      this.$socket.emit("createMessage", this.message, function(data) {
        console.log("Got It", data);
      });
      this.message.text = "";
    },
    emitLocation: function(data) {
      this.$socket.emit("createLocationMessage", data);
    },
    sendLocation: function() {
      let self = this;
      if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
      }
      navigator.geolocation.getCurrentPosition(
        function(position) {
          self.$socket.emit('createLocationMessage', {
            from: self.userName,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function(err) {
          alert("Unabled to fetch location");
        }
      );
    }
  },
  computed: {
    onMessageType: function() {
      return this.message.text.length > 0 ? true : false;
    }
  }
};
</script>

<style>
body {
  overflow: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.messages {
  overflow-y: scroll;
  width: 40%;
  height: 30rem;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: auto;
}
</style>
