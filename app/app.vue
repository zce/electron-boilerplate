<style lang="less">
  .window {
    display: flex;
    height: 100%;
  }

  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    .titlebar {
      border-bottom: 1/16rem solid transparent;
      display: flex;
      align-items: center;
      max-width: 100%;
      padding: 0 5/16rem;
      .title {
        flex: 1;
        margin: 10/16rem;
        font-size: 16/16rem;
        font-weight: normal;
        line-height: 30/16rem;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .btn {
        font-size: 18/16rem;
        font-weight: normal;
        background-color: transparent;
        border: 1/16rem solid;
        border-radius: 2/16rem;
        height: 32/16rem;
        width: 32/16rem;
        margin: 3/16rem;
        padding: 0;
      }
    }
    .content {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 15/16rem;
      position: relative;

      // .inner {
      //   // align-items: center;
      //   // justify-content: center;
      // }
    }
  }

  /* 必需 */
  .content-transition {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 15/16rem;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.2s;
    overflow: hidden;
    visibility: visible;
    opacity: 1;
  }

  /* .content-enter 定义进入的开始状态 */
  /* .content-leave 定义离开的结束状态 */
  .content-enter, .content-leave {
    opacity: 0;
    visibility: hidden;
  }
</style>

<template>
  <div class="window {{theme}}">
    <sidebar :open.sync="sidebarOpened"></sidebar>
    <main class="main">
      <header class="titlebar drag">
        <button class="btn no-drag" @click="window('toggle-sidebar')"><i class="fa fa-bars" aria-hidden="true"></i></button>
        <h2 class="title">{{title}}</h2>
        <button class="btn no-drag" @click="window('minimize')"><i class="fa fa-minus" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('maximize')"><i class="fa" :class="{ 'fa-expand': !isMaximized, 'fa-compress': isMaximized }" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('close')"><i class="fa fa-times" aria-hidden="true"></i></button>
      </header>
      <section class="content">
        <router-view transition="content"></router-view>
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

    // created () {
    // },

    data () {
      const mainWindow = this.$electron.remote.getCurrentWindow()

      setTimeout(() => { this.sidebarOpened = true }, 150)

      return {
        title: this.$config.app_name,
        isMaximized: mainWindow.isMaximized(),
        sidebarOpened: false,
        aboutOpened: false,
        theme: 'default'
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
