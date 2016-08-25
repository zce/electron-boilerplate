<style>

</style>

<template>
  <div class="inner">
    <h1 class="page-header drag">Update Demo</h1>
    <!-- <ul>
      <li>Core: <strong>{{core}}</strong></li>
      <li>Data: <strong>{{data}}</strong></li>
    </ul>
    <progress></progress> -->
    <button class="btn btn-primary btn-lg" @click="update()">Update</button>
    <button class="btn btn-danger btn-lg" @click="restart()">Install</button>
  </div>
</template>

<script>
  import updater from 'asar-updater'
  import config from '../../tasks/updater.config'
  const server = `${config.service}/${config.repository}/raw/${config.branch}/latest/`

  export default {
    name: 'update',
    pathname: '/update',

    ready () {
      updater.init()
      updater.setFeedURL('core.asar', server + 'core.json')
      updater.setFeedURL('data.asar', server + 'data.json')
      updater.on('available', (task) => console.log('available', task))
      updater.on('not-available', (task) => console.log('not-available', task))
      updater.on('progress', (task, p) => console.log(task.name, p))
      updater.on('downloaded', (task) => console.log('downloaded', task))
      updater.on('completed', (manifest, tasks) => alert(manifest))
      updater.on('error', console.log)
    },

    methods: {
      update () {
        updater.checkForUpdates()
      },
      restart () {
        updater.quitAndInstall()
      }
    }
  }
</script>
