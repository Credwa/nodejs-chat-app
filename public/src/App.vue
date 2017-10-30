<template>
  <div id="app">
    <md-input-container>
      <label>Textarea</label>
      <md-textarea v-model="message.text"></md-textarea>
    </md-input-container>
    <md-button class="md-primary md-raised" @click="onCreateMessage">Create Message</md-button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      message: {
        from: '',
        text: '',
        sentAt: null
      }
    };
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    disconnect: function() {
      console.log("Disconnected");
    },
    createEmail: function() {
      console.log('Email Created');
    },
    customEmit: function(val){
      console.log('Email Created');
    },
    createMessage: function() {
    },
    newMessage: function(message) {
      console.log('newMessage', message);
    }
  },
  methods: {
    onCreateMessage: function() {
      this.message.sentAt = new Date(new Date().getTime()).toUTCString();
      this.$socket.emit('createMessage', this.message);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
