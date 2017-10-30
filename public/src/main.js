import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import VueMaterial from 'vue-material'

Vue.use(VueMaterial)
Vue.use(VueSocketIO, 'http://localhost:3000');

Vue.material.registerTheme('default', {
  primary: {
    color: 'yellow',
    hue: '800'
  },
  accent: 'green',
  warn: 'red',
  background: {
    color: 'grey',
    hue: 100
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
