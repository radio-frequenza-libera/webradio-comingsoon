<template>
  <div class="Home">
    <h1 class="heading">
      Stiamo lavorando per ridare voce agli studenti
    </h1>
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
</style>
