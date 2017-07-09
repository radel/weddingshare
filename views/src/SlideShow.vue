<template>
  <div id="app">
    <div class="slide-container">
      <img :src="slide">
    </div>
  </div>
</template>

<script>

export default {
  name: 'slideshow',
  components: {
  },
  data() {
    return {
      'slide' : ''
    }
  },
  created() {
      var counter = 500;
    setInterval(function () {
      this.slide = '/slideshow?'+counter
      counter++;
    }.bind(this), 6000);
  },
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.slide-container {
  height: 100vh;
  width: 100vw;
  background: #333333 url('/static/img/bg.png') center center no-repeat;
  text-align: center;
}

.slide-container img {
  max-height: calc(100% - 20px);
  box-shadow: 0 0 3rem rgba(0,0,0,.5);
  border-radius: 3px;
  margin: 10px;
}
</style>
