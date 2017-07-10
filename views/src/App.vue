<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Upload from './Upload'
import slideshow from './SlideShow'
import photos from './Photos'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: Upload },
  { path: '/play', component: slideshow },
  { path: '/photos', component: photos},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})


export default {
  name: 'app',
  router,
  components: {
  },
  methods: {
    showSuccess (file) {
      console.log('file uploaded!')
      setTimeout(function(){ this.$refs.drop.removeFile(file) }.bind(this), 3000);
    },
    removeAll() {
      this.$refs.drop.removeAllFiles()
    }
  }
}
</script>

<style>

body {
  margin: 0;
}

#app {
  font: menu;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  text-align: center;
}



.nav {
  margin: 0;
  height: 80px;
  padding: 10px;
  color: #ffffff;
  background-color: #B71C1C !important;
  max-width: 100%;
}
.nav-item {
  justify-content: left;
}

.nav .nav-item img {
  max-height: 100%;
  text-align: left;
}

.dz-default.dz-message span {
}


h1 {
  color: #ffffff
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

</style>
