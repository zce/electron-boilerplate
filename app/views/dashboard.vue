<style scoped>
  div {
    align-items: center;
    justify-content: center;
  }
  img {
    margin-top: -25px;
    width: 450px;
  }
  code {
    background-color: rgba(40, 56, 76, .5);
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    padding: 3px 6px;
    margin: 0 3px;
    vertical-align: bottom;
  }
  p {
    line-height: 24px;
  }
  a {
    color: rgb(50, 174, 110);
    text-decoration: none;

    &:hover { color: rgb(40, 56, 76); }
  }
  ul {
    list-style-type: none;
    margin-top: 10px;
  }
  li {
    display: inline-block;
  }
</style>

<template>
  <div class="inner">
    <img src="../assets/img/logo.png" alt="electron-vue">
    <h1>Hello Electron + Vue.</h1>
    <p>
      You are currently at <code>`{{ route.path }}`</code> on the <code>`{{ route.name }}`</code> view.
    </p>
    <p>
      You are using electron v{{ versions['atom-shell'] }} with node v{{ versions.node }} on the {{ platform }} platform.
    </p>
    <p>{{$db.options.message}}</p>
    <ul class="js-external-link">
      <li><a href="https://github.com/zce/electron-boilerplate">documentation</a> |</li>
      <li><a href="http://electron.atom.io/">electron</a> |</li>
      <li><a href="http://vuejs.org/">vue.js</a> |</li>
      <li><a v-link="{ name: 'demo' }">demo</a></li>
    </ul>
    <ul class="js-external-link">
      <li><a href="http://{{$config.server.address}}:{{$config.server.port}}/">http://{{$config.server.address}}:{{$config.server.port}}/</a></li>
    </ul>
  </div>
</template>

<script>
  import os from 'os'

  export default {
    name: 'dashboard',
    components: {},
    data () {
      return {
        route: this.$router._currentRoute,
        platform: os.platform(),
        versions: process.versions
      }
    }
  }
</script>
