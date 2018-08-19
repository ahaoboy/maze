<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
  import Game from './components/Game'

  export default {
    name: 'App',
    components: {
      Game,
    }
  }
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
