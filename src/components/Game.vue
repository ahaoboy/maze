<template>
  <div class="game">
    <div class="row" v-for="row in mat">
      <div :class="getClass(cell)" v-for="cell in row">
        <!--{{cell}}-->
      </div>
    </div>
  </div>
</template>

<script>
  import Maze from './Maze'

  let classes = ['top', 'right', 'bottom', 'left']
  export default {
    name: "Game",
    data() {
      return {
        height: 10,
        width: 10,
        mat: []
      }
    },
    methods: {
      // 根据数字选class
      getClass(num) {

        let s = "cell "
        for (let i = 0; i < 4; i++) {
          if (!(num & (1 << i))) {
            s += classes[i] + ' '
          }
        }

        if (num & (1 << 4))
          s += 'path'
        return s

      }
    },
    mounted() {
      let maze = new Maze(this.height, this.width)
      this.mat = maze.mat
      console.log(maze)
      console.log(maze.getPath())
    }
  }
</script>

<style scoped>
  .game {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .cell {
    /*display: flex;*/
    width: 20px;
    height: 20px;
    border: 1px solid black;
    box-sizing: border-box;
  }

  .top {
    border-top: none;
  }

  .bottom {
    border-bottom: none;
  }

  .left {
    border-left: none;
  }

  .right {
    border-right: none;
  }

  .path {
    background: deepskyblue;
  }
</style>
