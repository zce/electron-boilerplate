<style lang="less">
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  /* 必需 */
  .fade-transition {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 10/16rem;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.2s;
    overflow: hidden;
    visibility: visible;
    opacity: 1;
  }

  /* .fade-enter 定义进入的开始状态 */
  /* .fade-leave 定义离开的结束状态 */
  .fade-enter, .fade-leave {
    opacity: 0;
    visibility: hidden;
  }
</style>

<template>
  <div class="window default">
    <sidebar :open.sync="sidebarOpened"></sidebar>
    <main class="main">
      <header class="titlebar drag">
        <button class="btn no-drag" @click="window('toggle-sidebar')"><i class="fa fa-bars" aria-hidden="true"></i></button>
        <h2 class="title">{{current_stamp}}</h2>
        <button class="btn no-drag" @click="window('minimize')"><i class="fa fa-minus" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('maximize')"><i class="fa" :class="{ 'fa-expand': !isMaximized, 'fa-compress': isMaximized }" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('close')"><i class="fa fa-times" aria-hidden="true"></i></button>
      </header>
      <section class="content">
        <router-view transition="fade"></router-view>
      </section>
    </main>
    <about :open.sync="aboutOpened"></about>
  </div>
</template>

<script>
  import sidebar from './components/sidebar'
  import about from './components/about'

  export default {
    components: { sidebar, about },

    ready () {
      // this.$server.start()
    },

    data () {
      const mainWindow = this.$electron.remote.getCurrentWindow()

      setTimeout(() => { this.sidebarOpened = true }, 150)

      return {
        sidebarOpened: false,
        aboutOpened: false,
        isMaximized: mainWindow.isMaximized(),
        current_stamp: this.$config.app_name
      }
    },

    methods: {
      window (action) {
        if (action === 'toggle-sidebar') {
          this.sidebarOpened = !this.sidebarOpened
          return
        }

        if (action === 'toggle-about') {
          this.aboutOpened = !this.aboutOpened
          return
        }

        const mainWindow = this.$electron.remote.getCurrentWindow()

        if (action === 'maximize') {
          action = mainWindow.isMaximized() ? 'unmaximize' : 'maximize'
          this.isMaximized = !this.isMaximized
        } else if (action === 'close') {
          if (!confirm('确认关闭？')) return
        }
        const m = mainWindow[action]
        typeof m === 'function' && m()
      }
    }
  }
</script>
