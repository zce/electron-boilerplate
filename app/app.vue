<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
</style>

<template>
  <div class="window default">
    <sidebar :open="sidebarOpened"></sidebar>
    <main class="main">
      <header class="titlebar drag">
        <button class="btn no-drag" @click="window('toggle-sidebar')"><i class="fa fa-bars" aria-hidden="true"></i></button>
        <h2 class="title">{{current_stamp}}</h2>
        <button class="btn no-drag" @click="window('minimize')"><i class="fa fa-minus" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('maximize')"><i class="fa" :class="{ 'fa-expand': !isMaximized, 'fa-compress': isMaximized }" aria-hidden="true"></i></button>
        <button class="btn no-drag" @click="window('close')"><i class="fa fa-times" aria-hidden="true"></i></button>
      </header>
      <section class="content">
        <router-view></router-view>
      </section>
    </main>
    <div id="about" class="modal fade">
      <div class="modal-dialog" role="document">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
          </button>
          <h3 class="modal-title">{{$config.app_name}}</h3>
        </div>
        <div class="modal-body">
          <p>Coming soon&hellip;</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from './components/sidebar'

  export default {
    components: { sidebar },

    ready () {
      this.$server.start()
    },

    data () {
      const mainWindow = this.$electron.remote.getCurrentWindow()

      setTimeout(() => { this.sidebarOpened = true }, 150)

      return {
        sidebarOpened: false,
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
