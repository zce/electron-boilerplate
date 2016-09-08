<style>

</style>

<template>
  <div class="inner">
    <h1 class="page-header drag">Demos</h1>
    <!-- <ul>
      <li>Core: <strong>{{core}}</strong></li>
      <li>Data: <strong>{{data}}</strong></li>
    </ul>
    <progress></progress> -->
    <button class="btn btn-primary btn-lg" @click="update()">Update</button>
    <br>
    <button class="btn btn-danger btn-lg" @click="restart()">Install</button>
    <br>
    <button class="btn btn-info btn-lg" @click="log()">Logger</button>
  </div>
</template>

<script>
  import updater from 'asar-updater'
  import config from '../../tasks/updater.config'
  const server = `${config.service}/${config.repository}/raw/${config.branch}/latest/`

  export default {
    name: 'demo',
    pathname: '/demo',

    ready () {
      updater.init()
      updater.setFeedURL('core.asar', `${server}core.json`)
      updater.setFeedURL('data.asar', `${server}data.json`)
      updater.on('available', (task) => {
        console.log('available', task)
      })
      updater.on('not-available', (task) => {
        console.log('not-available', task)
      })
      updater.on('progress', (task, p) => {
        console.log(task.name, p)
      })
      updater.on('downloaded', (task) => {
        console.log('downloaded', task)
      })
      updater.on('completed', (manifest, tasks) => {
        console.log('completed', manifest, tasks)
        // this.$electron.remote.app.quit()
      })
      updater.on('error', (err) => {
        console.error(err)
        // this.$electron.remote.app.quit()
      })
    },

    methods: {
      update () {
        updater.checkForUpdates()
      },
      restart () {
        updater.quitAndInstall()
      },
      log () {
        this.$logger.info('hello world')
      }
    }
  }
</script>
