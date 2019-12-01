<template>
  <div id="app">
    <div class="row">
    <Calculator/><History/>
    </div>
  </div>
</template>

<script>
import History from './components/History'
import Calculator from './components/Calculator'

export default {
  name: 'app',
  components: {
    Calculator,
    History
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
