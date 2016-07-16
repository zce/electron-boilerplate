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
    <current></current>
    <versions></versions>
    <links></links>
  </div>
</template>

<script>
  import current from './dashboard/currentpage'
  import links from './dashboard/links'
  import versions from './dashboard/versions'

  export default {
    components: {
      current,
      links,
      versions
    },
    name: 'dashboard'
  }
</script>
