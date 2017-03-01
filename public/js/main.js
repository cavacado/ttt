console.log('hello world!');
const socket = io();
socket.on('joined', function(count){
  console.log(`${count} persons are in the room `);
})

new Vue({
  el: '#app',
  data: {
    x: 0
  },
  methods: {
    xCoordinate: function(e) {
      this.x = e.clientX;
    },
    triggerRipple: function(e) {
      // Add the element
      $(this.$el).prepend("<span class='ripple'></span>");

      // Get the center of the element
      let rand = Math.random()*(600-50) + 50;
      var x = e.clientX - rand / 2
      var y = e.clientY - rand / 2

      // Add the ripples CSS and start the animation
      let data = {
        width: `${rand}px`,
        height: `${rand}px`,
        top: y + 'px',
        left: x + 'px',
        background: `hsl(${this.x}, 80%, 50%)`
      }
      socket.emit('clientToServer', data)
      $(".ripple").css({
        width: `${rand}px`,
        height: `${rand}px`,
        top: y + 'px',
        left: x + 'px',
        background: `hsl(${this.x}, 80%, 50%)`
      }).addClass("rippleEffect");
    }
  },
  template: '<div id="app" :style="{ backgroundColor: `white`}" @mousemove="xCoordinate" @click="triggerRipple"></div>'
})

socket.on('toEveryone', function(data) {
  let newNode = document.createElement('span');
  console.log(data);
  newNode.style.width = data.width;
  newNode.style.height = data.height;
  newNode.style.top = data.top;
  newNode.style.left = data.left;
  newNode.style.background = data.background;
  document.getElementById('app').appendChild(newNode);
  newNode.classList.add('ripple');
  newNode.classList.add('rippleEffect');
})
