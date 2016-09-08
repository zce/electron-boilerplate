<style lang="less">
  .window {
    display: flex;
    height: 100vh;
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
      padding: 10/16rem;
      position: relative;
    }
  }
  .content-transition {
    display: flex;
    flex: 1;
    flex-direction: column;
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
  .content-enter,
  .content-leave {
    opacity: 0;
    visibility: hidden;
  }
</style>

<template>
  <about :open.sync="about_opened"></about>
  <div class="window {{window_theme}}">
    <sidebar :open.sync="sidebar_opened"></sidebar>
    <main class="main">
      <header class="titlebar drag">
        <button class="btn no-drag" @click="window('toggle-sidebar')"><i class="fa fa-bars" aria-hidden="true"></i></button>
        <h2 class="title">{{title}}</h2>
        <button class="btn no-drag" @click="window('minimize')"><i class="fa fa-minus" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('maximize')"><i class="fa" :class="{ 'fa-expand': !maximized, 'fa-compress': maximized }" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('close')"><i class="fa fa-times" aria-hidden="true"></i></button>
      </header>
      <section class="content">
        <router-view transition="content"></router-view>
      </section>
    </main>
  </div>
</template>

<script>
  import electron from 'electron'
  import Vue from 'vue'

  import sidebar from './components/sidebar'
  import about from './components/about'
  import store from './libraries/vuex/store'

  const mainWindow = electron.remote.getCurrentWindow()

  export default {
    store,

    components: { sidebar, about },

    ready () {
      this.$server.start(() => {
        const restart = (n, o) => {
          if (n === o) return
          this.$config.server.address = this.server_address
          this.$option.set('server_address', this.server_address)
          this.$config.server.port = this.server_port
          this.$option.set('server_port', this.server_port)
          this.$emit('server_link_changed')
          this.$server.start()
        }
        this.$watch('server_address', restart)
        this.$watch('server_port', restart)
      })
      this.$watch('lang', n => this.$option.set('lang', (Vue.config.lang = n)))
      this.$watch('window_theme', n => this.$option.set('window_theme', n))
      mainWindow
        .on('maximize', () => { this.maximized = true })
        .on('unmaximize', () => { this.maximized = false })
    },

    data () {
      setTimeout(() => { this.sidebar_opened = this.$option.get('sidebar_opened', true) }, 50)
      let address = this.$option.get('server_address')
      address = this.$utils.getMachineAddresses().includes(address) ? address : this.$utils.getLocalAreaAddress()
      this.$config.server.address = address
      this.$config.server.port = this.$option.get('server_port', this.$config.server.port)
      return {
        title: this.$config.app.name,
        maximized: mainWindow.isMaximized(),
        sidebar_opened: false,
        about_opened: false,
        window_theme: this.$option.get('window_theme', 'default'),
        server_address: this.$config.server.address,
        server_port: this.$config.server.port,
        lang: Vue.config.lang
      }
    },

    methods: {
      window (action) {
        switch (action) {
          case 'toggle-sidebar':
            this.sidebar_opened = !this.sidebar_opened
            this.$option.set('sidebar_opened', this.sidebar_opened)
            return
          case 'toggle-about':
            this.about_opened = !this.about_opened
            return
          case 'maximize':
            action = mainWindow.isMaximized() ? 'unmaximize' : 'maximize'
            break
        }

        const m = mainWindow[action]
        typeof m === 'function' && m()
      }
    }
  }
</script>
