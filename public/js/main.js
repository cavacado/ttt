console.log('hello world!');

new Vue({
  el: '#app',
  data: {
    x: 0
  },
  methods: {
    xCoordinate(e) {
      this.x = e.clientX;
    }
  },
  template: '<div id="app" :style="{ backgroundColor: `hsl(${x}, 80%, 50%)`}" @mousemove="xCoordinate"></div>'
})
