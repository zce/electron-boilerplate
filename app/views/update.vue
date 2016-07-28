<style>

</style>

<template>
  <div class="inner">
    <h1 class="page-header drag">Update Demo</h1>
    <p class="select">this is demo page!</p>
    <button class="btn btn-primary btn-lg" @click="update()">UPDATE</button>
  </div>
</template>

<script>
  import updater from 'asar-updater'

  export default {
    name: 'update',
    ready () {
      updater.init()
      updater.setFeedURL('core.asar', 'https://raw.githubusercontent.com/zce/electron-boilerplate/vue-auto-update/dist/latest/core.json')
      // updater.on('available', (task) => console.log('available', task))
      // updater.on('not-available', (task) => console.log('not-available', task))
      // updater.on('progress', (task, p) => console.log(task.name, p))
      // updater.on('downloaded', (task) => console.log('downloaded', task))
      // updater.on('completed', (manifest, tasks) => console.log('completed', manifest))
      // updater.on('error', console.log)
    },
    methods: {
      update () {
        updater.checkForUpdates()
      }
    }
  }
</script>
