<template>
  <div class="App">
    <div class="content top">
      <div class="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </div>
      <div class="logo">&nbsp;</div>
    </div>
    <div class="content bottom">
      <!-- TODO player here -->
      <router-view/>
    </div>
    <waves-background class="waves"></waves-background>
  </div>
</template>

<script lang="ts">
import WavesBackground from '@/components/waves-canvas.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    WavesBackground
  }
})
export default class App extends Vue {
}
</script>

<style lang="less" scoped>
  @import (reference) './less/_variables';

  .App {
    text-align: center;
    color: @white;
    position: relative;
    height: 100vh;
    width: 100vw;
    /*background: transparent url('~@/assets/music-wallpaper.jpg') no-repeat center;*/
    background-size: cover;
    display: flex;
    flex-direction: column;
  }

  .content {
    position: relative;
    z-index: 100;
    flex: 0 0 50%;
    padding: 20px 0;
  }

  .nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: @white;

      &.router-link-exact-active {
        color: @gray;
      }
    }
  }

  .logo {
    display: block;
    width: 25%;
    padding-top: 25%;
    margin: 0 auto;
    background: @white url('~@/assets/rfl-decomp.svg') no-repeat center;
    background-size: 110%;
    border-radius: 50%;
  }

  .waves {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
