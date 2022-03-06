<template>
  <div id="app">
    <SideBar class="sidebar"/>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar/SideBar.vue'

export default {
  name: 'App',
  components:{
    SideBar
  }
}
</script>

<style>
body,#app {
  padding: 0;
  margin: 0;
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
#app{
  padding-left: 250px;
}
.sidebar{
    left: 0;
}
.router{
  margin-left: 30px;
  margin-right: 30px;
}
</style>
