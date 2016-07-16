<style scoped>
  div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div>
    <img src="../assets/img/logo.png" alt="electron-vue">
    <h1>Hello Electron + Vue.</h1>
    <current-page></current-page>
    <versions></versions>
    <links></links>
  </div>
</template>

<script>
  import CurrentPage from './dashboard/currentpage'
  import Links from './dashboard/links'
  import Versions from './dashboard/versions'

  export default {
    components: {
      CurrentPage,
      Links,
      Versions
    },
    name: 'dashboard'
  }
</script>
