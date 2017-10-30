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
        createdAt: null
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
    createMessage: function() {
    },
    newMessage: function(message) {
      console.log('newMessage', message);
    }
  },
  methods: {
    onCreateMessage: function() {
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
