<style lang="less" scoped>
  .inner {
    align-items: center;
    justify-content: center;
  }
  img {
    margin-top: -25px;
    width: 450px;
    transition: transform 1s ease;
    transform-origin: 50px 50px;

    &.rotate {
      transform: rotate(700deg);
    }
  }
  p {
    line-height: 24px;
    code {
      background-color: rgba(40, 56, 76, .5);
      border-radius: 3px;
      color: #fff;
      font-weight: bold;
      padding: 3px 6px;
      margin: 0 3px;
      vertical-align: bottom;
    }
  }
  a {
    color: rgb(50, 174, 110);
    text-decoration: none;
    &:hover { color: rgb(40, 56, 76); }
  }
  ul {
    list-style-type: none;
    margin-top: 10px;
    padding: 0;
    li {
      display: inline-block;
    }
    li + li::before {
      content: '|';
      padding: 6px;
      color: #ccc;
    }
  }
</style>

<template>
  <div class="inner">
    <img src="../assets/img/logo.png" alt="electron-vue" :class="{rotate: rotate}" @click="eggshell()">
    <h1>{{$config.app.name}}</h1>
    <p>{{$t('dashboard.introduction', { electron: versions.electron, node: versions.node, platform: platform })}}</p>
    <ul>
      <li><a v-link="{ name: 'demo' }">Demo</a></li>
      <li><a v-link="{ name: 'vuex' }">VUEX</a></li>
      <li><a v-link="{ name: 'blank' }">Blank</a></li>
    </ul>
    <ul class="js-external-link">
      <li><a href="https://github.com/zce/electron-boilerplate">Github</a></li>
      <li><a href="http://electron.atom.io/">Electron</a></li>
      <li><a href="http://vuejs.org/">Vue.js</a></li>
      <li><a href="http://{{$config.server.address}}:{{$config.server.port}}/">Ext Serve</a></li>
    </ul>
    <p>{{$t('dashboard.copyright')}}</p>
    <p>{{$db.options.message}}</p>
  </div>
</template>

<script>
  import os from 'os'

  export default {
    name: 'dashboard',
    pathname: '/',

    data () {
      return {
        platform: os.platform(),
        versions: process.versions,
        click: 0,
        rotate: false
      }
    },

    methods: {
      eggshell () {
        if (!this.click) {
          setTimeout(() => {
            if (this.click > 6) {
              this.rotate = !this.rotate
              alert(`手速：${this.click}/1000ms`)
            }
            this.click = 0
          }, 1000)
        }
        this.click++
      }
    }
  }
</script>
