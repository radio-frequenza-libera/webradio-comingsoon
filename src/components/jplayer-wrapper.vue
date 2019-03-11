<template>
  <div class="JPlayerWrapper">
    <audio controls="controls" ref="player">
      <source src="https://stream.frequenzalibera.it/radio.ogg" type="audio/ogg"/>
      <source src="https://stream.frequenzalibera.it/radio.mp3" type="audio/mpeg"/>
      Your browser does not support the audio element.
    </audio>
    <div class="nowPlaying">
      <h4>Ora in onda</h4>
      <p>{{nowPlaying}}</p>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jplayer'
import axios from 'axios'

export default {
  name: 'JPlayerWrapper',
  data () {
    return {
      nowPlaying: ''
    }
  },
  methods: {
    getServerInfo () {
      axios.get('https://stream.frequenzalibera.it/status-json.xsl')
        .then(response => {
          console.log(response.data)
          this.nowPlaying = response.data.icestats.source[3].title
        })
        .catch(() => {})
    }
  },
  mounted () {
    // $(this.$refs.player).jPlayer({
    //   ready: function () {
    //     $(this).jPlayer('setMedia', {
    //       mp3: 'https://stream.frequenzalibera.it:8443/radio.mp3',
    //       aac: 'https://stream.frequenzalibera.it:8443/radio.aac',
    //     })
    //   },
    //   swfPath: '/js',
    //   supplied: 'm4a, oga'
    // })
    this.getServerInfo()
    setInterval(this.getServerInfo, 5000)
  }
}
</script>

<style lang="less" scoped>
  @import (reference) '../less/_variables';

  .nowPlaying {
    color: @black;
  }
</style>
