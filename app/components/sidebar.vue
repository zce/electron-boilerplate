<template>
  <aside class="sidebar" :style="{ width: open ? '250px': '0' }">
    <div class="panel menu">
      <h1 class="logo drag">{{$config.app_name}}</h1>
      <hr>
      <h3>ACTIONS</h3>
      <div class="scroll actions">
        <ul>
          <li v-link="{ name: 'dashboard' }">Dashboard</li>
          <li v-link="{ name: 'demo' }">Demo</li>
        </ul>
      </div>
      <hr>
      <h3>RECORDS</h3>
      <div class="scroll">
        <ul>
          <li v-for="item in records" track-by="$index" :class="{ active: $root.current_stamp === item.stamp }" title="{{ item.path }}" v-link="{ name: 'watcher', params: { item: item.stamp } }">
            <span class="name">{{item.name}}</span>
            <i class="fa fa-external-link" title="在文件夹中找到" @click="reveal(item, $event)"></i>
            <i class="fa fa-times" title="删除到回收站" @click="remove(item, $event)"></i>
          </li>
        </ul>
      </div>
      <hr>
      <h3>HELP</h3>
      <div class="scroll actions">
        <ul>
          <li data-toggle="option">Option</li>
          <li data-toggle="modal" data-target="#about">About</li>
        </ul>
      </div>
    </div>
    <div class="panel option">
      <h1>Demo</h1>
      <hr>
      <h3>Options</h3>
      <div class="scroll">
        <ul>
          <li>
            <label>theme</label>
            <select>
              <option value="default">default</option>
              <option value="dark">dark</option>
              <option value="light">light</option>
            </select>
          </li>
          <li>
            <label>port</label>
            <input type="text">
          </li>
        </ul>
      </div>
      <hr>
      <h3>help</h3>
      <div class="scroll actions">
        <ul>
          <li data-toggle="option">back</li>
        </ul>
      </div>
    </div>
    <i class="resizer"></i>
  </aside>
</template>

<script>
  import path from 'path'

  export default {
    props: ['open'],

    data () {
      this.loadRecords()
      this.$storage.watchList(() => this.loadRecords())
      return { records: [] }
    },

    methods: {
      loadRecords () {
        this.$storage.getList().then(files => {
          this.records = files.map(file => ({
            name: file,
            stamp: path.basename(file, this.$config.storage_ext),
            path: path.join(this.$config.storage_root, file)
          }))
        })
      },

      remove (item, e) {
        e.preventDefault()
        e.stopPropagation()
        if (!confirm(`确认删除『${item.stamp}${this.$config.storage_ext}』？`)) return false

        try {
          // 删除到回收站
          item.path && this.$electron.shell.moveItemToTrash(item.path)
        } catch (e) {
          // return $.logger.error(e)
        }
        // 当前打开的不是该文件
        if (this.$root.current_stamp !== item.stamp) return false
        // 跳转到第一个记录
        const find = this.records.some(r => {
          if (r.stamp !== item.stamp) {
            this.$router.go({ name: 'watcher', params: { item: r.stamp } })
            return true
          }
        })

        // 没有记录跳转到开始界面
        find || this.$router.go({ name: 'editor' })
      },

      reveal (item, e) {
        e.preventDefault()
        e.stopPropagation()
        item.path && this.$electron.shell.showItemInFolder(item.path)
      }
    }
  }
</script>
