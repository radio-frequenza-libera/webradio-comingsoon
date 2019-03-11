<template>
  <div class="Home">
    <h1 class="heading">
      Stiamo lavorando per ridare voce agli studenti
    </h1>
    <p class="copy">
      Nel frattempo puoi riascoltare <a target="_blank" href="http://podcast.frequenzalibera.it/">i nostri podcast</a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Home extends Vue {
}
</script>

<style lang="less" scoped>
  @import (reference) '../less/_variables';

  .Home {
    color: @black;
  }

  .copy {
    a, a:visited {
      position: relative;
      text-decoration: none;
      color: fadeout(@black, 20%);

      &:after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background-color: fadeout(@black, 20%);
        transition: width 0.25s ease-out;
      }

      &:hover:after {
        width: 100%;
      }
    }
  }
</style>
