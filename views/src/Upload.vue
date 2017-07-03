<template>
  <div id="app">

    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Default</h2>

      <md-button class="md-icon-button">
        <md-icon>favorite</md-icon>
      </md-button>
    </md-toolbar>

    <div class="notification is-success" v-show="done">
      <button class="delete is-large" @click="removeAll()"></button>
      tutti i file sono stati caricati!
    </div>
    <div class="notification" v-show="queued > 0 && !done || processing">
      <div class="level">
        <div class="level-left">
          <p class="content">
            <strong>{{queued}}</strong> foto sono pronte per essere inviate
          </p>
        </div>
        <div class="level-right">
          <button class="button is-outlined is-success" @click="send()">
            <i class="fa fa-send"></i>&nbsp;invia</button>
        </div>
      </div>
      <div class="level" v-show="processing">
        <progress class="progress is-success" :value="progress" max="100">{{progress}}</progress>
      </div>
    </div>

    <dropzone ref="drop" :language="language" :maxNumberOfFiles="10" :autoProcessQueue="false" v-on:vdropzone-total-upload-progress="updateProgress($event, progress)" v-on:vdropzone-files-added="updateQueue()" v-on:vdropzone-queue-complete="showSuccess()" :useCustomDropzoneOptions="true" :dropzoneOptions="options" id="weddingShare" :url="url" :maxFileSizeInMB="5" :useFontAwesome=true v-on:vdropzone-success="showSuccess">

      <input type="hidden" name="token" value="ok">
    </dropzone>

    <md-button class="md-fab add-files md-fab-bottom-right" title="aggiungi le tue foto!" @click="resetDone()">
      <md-icon>
        <i class="fa fa-plus"></i>
      </md-icon>
    </md-button>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'

export default {
  name: 'upload',
  data() {
    return {
      done: false,
      queued: 0,
      url: '/upload',
      processing: false,
      progress: 0,
      options: {
        "dictDefaultMessage": '',
        "clickable": '.add-files'
      },
      language: {
        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
        dictDefaultMessage: "<br>Premi il bottone in basso a destra per aggiungere le tue fotografie! Non più di 10 alla volta",
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
        dictCancelUpload: "Annulla il caricamento",
        dictFallbackMessage: "Your browser does not support drag and drop file uploads.",
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
        dictInvalidFileType: "You can't upload files of this type.",
        dictMaxFilesExceeded: "You can not upload any more files. (max: {{maxFiles}})",
        dictRemoveFile: "Rimuovi",
        dictRemoveFileConfirmation: null,
        dictResponseError: "Server responded with {{statusCode}} code.",
      }
    }
  },
  components: {
    Dropzone
  },
  ready() {
    this.$on('vdropzone-files-added', function (file) {
      console.log(file)
    })
  },
  methods: {
    showSuccess(file) {
      this.$refs.drop.removeFile(file)
      this.updateQueue();
    },
    send() {
      this.$refs.drop.processQueue();
      this.done = false;
      this.processing = true;
    },
    updateProgress(progress) {
      this.progress = progress;
      this.updateQueue()
      if (this.progress == 100 && this.queued == 0) {
        this.done = true;
        this.removeAll();
      }
    },
    removeAll() {
      this.$refs.drop.removeAllFiles()
      this.processing = false;
      this.queued = 0
      setTimeout(function () {
        this.resetDone();
      }.bind(this), 3000)
    },
    resetDone() {
      this.done = false;
    },
    updateQueue() {
      this.done = false;
      if (this.$refs.drop) {
        this.queued = this.$refs.drop.getQueuedFiles().length;
      } else {
        this.queued = 0;
      }
    },
  }
}
</script>

<style>
.add-files {

}

.add-files:hover {
}

.add-files i {
}

.vue-dropzone {
  min-height: 80vh;
  border: 0px;
  background: white;
}
</style>
