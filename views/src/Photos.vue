<template>
  <div id="app">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1">WeddingShare</h2>
      <md-button class="md-icon-button">
        <md-icon>favorite</md-icon>
      </md-button>
    </md-toolbar>
    <md-layout md-gutter>
      <template v-for="photo in photos">
        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
          <md-card md-with-hover>
            <md-card-media>
              <img :src="photourl(photo)" alt="People">

              <md-ink-ripple></md-ink-ripple>
            </md-card-media>

            <md-card-actions>
              <md-button @click="removePhoto(photo)" class="md-icon-button">
                <md-icon>delete</md-icon>
              </md-button>
            </md-card-actions>
          </md-card>
        </md-layout>
      </template>
    </md-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'photos',
  components: {
  },
  data() {
    return {
      'photos': [],
    }
  },
  created() {
    this.loadPhotos();
  },
  methods: {
    loadPhotos() {
      axios.get(`/photos`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.photos = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    photourl(photo) {
      return '/photos/' + photo;
    },
    removePhoto(photo) {
      axios.delete(`/photos/${photo}`)
      .then(response => {
          this.loadPhotos()       // JSON responses are automatically parsed.
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
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
  box-shadow: 0 0 3rem rgba(0, 0, 0, .5);
  border-radius: 3px;
  margin: 10px;
}
</style>
