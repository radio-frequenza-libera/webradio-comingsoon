<template>
  <div class="WavesCanvas">
    <canvas ref="theCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface WaveDefinition {
  color: string,
  nodes: number[][]
}

@Component({
  props: {}
})
export default class WavesCanvas extends Vue {
  colors: string[] = ['#ffffff', '#888888', '#FF0000']
  count: number = 20
  width: number = 0
  height: number = 0
  waveHeight: number = 70
  waves: WaveDefinition[] = []

  mounted () {
    this.resizeCanvas()

    for (let i = 0; i < this.count; i++) {
      this.createWave(this.colors[i], 5)
    }
    setInterval(this.update, 10)

    window.addEventListener('resize', this.resizeCanvas)
  }

  destroyed () {
    window.removeEventListener('resize', this.resizeCanvas)
  }

  getCanvas (): HTMLCanvasElement {
    let canvas = <HTMLCanvasElement>this.$refs['theCanvas']
    if (!canvas) {
      throw new Error(`No canvas detected in component`)
    } else {
      return canvas
    }
  }

  getCanvasCtx (): CanvasRenderingContext2D {
    let canvas = this.getCanvas()
    let context = canvas.getContext('2d')
    if (!context) {
      throw new Error(`2d context not supported or canvas already initialized`)
    } else {
      return context
    }
  }

  createWave (color: string, nodes: number) {
    let nodeArray: number[][] = [[]]
    for (let i: number = 0; i <= nodes + 2; i++) {
      // Each node is a set of four points
      let node: number[] = [((i - 1) * this.width) / nodes, 0, Math.random() * 200, 0.3]
      nodeArray.push(node)
    }
    this.waves.push({
      color: color,
      nodes: nodeArray
    })
  }

  update () {
    let context = this.getCanvasCtx()

    context.fillStyle = '#000000'
    context.globalCompositeOperation = 'source-over'
    context.fillRect(0, 0, this.width, this.height)

    context.globalCompositeOperation = 'screen'
    // Draw waves
    this.waves.forEach(wave => {
      wave.nodes.forEach(node => {
        this.bounce(node)
      })

      this.drawWave(wave)
    })
  }

  bounce (node: number[]) {
    // We change the value of the quadratic pull for each point to move the line
    node[1] = (this.waveHeight / 2) * Math.sin(node[2] / 20) + this.height / 2;
    node[2] = node[2] + node[3];
  }

  drawWave (wave: WaveDefinition) {
    let context = this.getCanvasCtx()

    function diff (a: number, b: number): number {
      return (b - a) / 2 + a
    }

    context.fillStyle = wave.color
    context.beginPath();
    context.moveTo(0, this.height)
    context.lineTo(wave.nodes[0][0], wave.nodes[0][1])
    for (let i = 0; i < wave.nodes.length; i++) {
      if (wave.nodes[i + 1]) {
        context.quadraticCurveTo(
          wave.nodes[i][0],
          wave.nodes[i][1],
          diff(wave.nodes[i][0], wave.nodes[i + 1][0]),
          diff(wave.nodes[i][1], wave.nodes[i + 1][1]),
        );
      } else {
        context.lineTo(wave.nodes[i][0], wave.nodes[i][1])
        context.lineTo(this.width, this.height)
      }
    }

    context.closePath()
    context.fill()
  }

  resizeCanvas () {
    let canvas = this.getCanvas()
    this.width = canvas.width = this.$el.clientWidth
    this.height = canvas.height = this.$el.clientHeight
    this.update();
  }
}
</script>

<style lang="less" scoped>

</style>
