webpackJsonp([0],[,,,function(e,t){},function(e,t,o){function n(e){o(11)}var s=o(0)(o(6),o(16),n,null,null);e.exports=s.exports},,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(14),s=o.n(n),i=o(13),r=o.n(i),a=o(1),d=[{path:"/",component:s.a},{path:"/play",component:r.a}],u=new a.a({routes:d});t.default={name:"app",router:u,components:{},methods:{showSuccess:function(e){console.log("file uploaded!"),setTimeout(function(){this.$refs.drop.removeFile(e)}.bind(this),3e3)},removeAll:function(){this.$refs.drop.removeAllFiles()}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"slideshow",components:{},data:function(){return{slide:""}},created:function(){var e=500;setInterval(function(){this.slide="/slideshow?"+e,e++}.bind(this),4e3)}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(19),s=o.n(n);t.default={name:"upload",data:function(){return{done:!1,queued:0,url:"/upload",processing:!1,progress:0,options:{dictDefaultMessage:"",clickable:".add-files"},language:{dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictDefaultMessage:"<br>Premi il bottone in basso a destra per aggiungere le tue fotografie! Non più di 10 alla volta",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictCancelUpload:"Annulla il caricamento",dictFallbackMessage:"Your browser does not support drag and drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictInvalidFileType:"You can't upload files of this type.",dictMaxFilesExceeded:"You can not upload any more files. (max: {{maxFiles}})",dictRemoveFile:"Rimuovi",dictRemoveFileConfirmation:null,dictResponseError:"Server responded with {{statusCode}} code."}}},components:{Dropzone:s.a},ready:function(){this.$on("vdropzone-files-added",function(e){console.log(e)})},methods:{showSuccess:function(e){this.$refs.drop.removeFile(e),this.updateQueue()},send:function(){this.$refs.drop.processQueue(),this.done=!1,this.processing=!0},updateProgress:function(e){this.progress=e,this.updateQueue(),100==this.progress&&0==this.queued&&(this.done=!0,this.removeAll())},removeAll:function(){this.$refs.drop.removeAllFiles(),this.processing=!1,this.queued=0,setTimeout(function(){this.resetDone()}.bind(this),3e3)},resetDone:function(){this.done=!1},updateQueue:function(){this.done=!1,this.$refs.drop?this.queued=this.$refs.drop.getQueuedFiles().length:this.queued=0},openCredits:function(){this.$refs.credits.open()}},watch:{done:function(){this.done&&this.$refs.done.open()}}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(2),s=o(1),i=o(4),r=o.n(i),a=o(5),d=o.n(a),u=o(3);o.n(u);n.default.use(s.a),n.default.use(d.a),n.default.material.registerTheme("default",{primary:"red",accent:"blue",warn:"red",background:"white"}),n.default.config.productionTip=!1,new n.default({el:"#app",render:function(e){return e(r.a)}})},function(e,t){},function(e,t){},function(e,t){},function(e,t,o){function n(e){o(12)}var s=o(0)(o(7),o(17),n,null,null);e.exports=s.exports},function(e,t,o){function n(e){o(10)}var s=o(0)(o(8),o(15),n,null,null);e.exports=s.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("md-toolbar",[o("h2",{staticClass:"md-title",staticStyle:{flex:"1"}},[e._v("WeddingShare")]),e._v(" "),o("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.openCredits()}}},[o("md-icon",[e._v("favorite")])],1)],1),e._v(" "),o("md-dialog-alert",{ref:"credits",attrs:{"md-content":"Grazie per aver condiviso con noi questa giornata! "}}),e._v(" "),o("md-dialog-alert",{ref:"done",attrs:{"md-content":"tutti i file sono stati caricati!"}}),e._v(" "),o("md-list",{directives:[{name:"show",rawName:"v-show",value:e.queued>0&&!e.done||e.processing,expression:"queued > 0 && !done || processing"}]},[o("md-list-item",[o("span",[o("strong",[e._v(e._s(e.queued))]),e._v(" foto sono pronte per essere inviate")]),e._v(" "),o("md-button",{staticClass:"md-raised md-primary",on:{click:function(t){e.send()}}},[o("md-icon",[e._v("send")]),e._v(" invia")],1)],1)],1),e._v(" "),o("md-whiteframe",[o("md-progress",{directives:[{name:"show",rawName:"v-show",value:e.processing,expression:"processing"}],attrs:{"md-progress":e.progress}})],1),e._v(" "),o("dropzone",{ref:"drop",attrs:{language:e.language,maxNumberOfFiles:10,autoProcessQueue:!1,useCustomDropzoneOptions:!0,dropzoneOptions:e.options,id:"weddingShare",url:e.url,maxFileSizeInMB:5,useFontAwesome:!0},on:{"vdropzone-total-upload-progress":function(t){e.updateProgress(t,e.progress)},"vdropzone-files-added":function(t){e.updateQueue()},"vdropzone-queue-complete":function(t){e.showSuccess()},"vdropzone-success":e.showSuccess}},[o("input",{attrs:{type:"hidden",name:"token",value:"ok"}})]),e._v(" "),o("md-button",{staticClass:"md-fab add-files md-fab-bottom-right",attrs:{title:"aggiungi le tue foto!"},on:{click:function(t){e.resetDone()}}},[o("md-icon",[e._v("\n      add\n    ")])],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("img",{attrs:{src:e.slide}})])},staticRenderFns:[]}}],[9]);
//# sourceMappingURL=app.13859bf7a0d5e9e73af4.js.map