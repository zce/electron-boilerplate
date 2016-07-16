<style lang="less">
  .sidebar {
    // display: flex;
    position: relative;
    transition: width 0.2s ease-in-out;

    .panel {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      transition: opacity .15s linear;

      h1 {
        cursor: default;
        font-size: 25/16rem;
        font-weight: normal;
        margin-bottom: 2/16rem;
        margin-top: 12/16rem;
        padding: 0 20/16rem;
        // max-width: 200/16rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h3 {
        margin: 0;
        padding: 0 0 0 10/16rem;
        font-size: 10/16rem;
        font-weight: normal;
      }
      hr {
        height: 1/16rem;
        width: 100%;
        border: 0;
        margin-top: 10/16rem;
        margin-bottom: 10/16rem;
      }
      ul {
        padding: 0;
        font-size: 100%;
        list-style-type: none;
        margin: 0;
        li {
          display: flex;
          align-items: center;
          cursor: pointer;
          box-sizing: border-box;
          margin: 0;
          padding: 12/16rem;
          padding-left: 20/16rem;
          white-space: nowrap;
          &:hover, &.active {
            border-left: 10/16rem solid transparent;
            padding-left: 10/16rem;
            i {
              color: #888
            }
          }
          .name {
            flex: 1;
          }
          i {
            display: inline-block;
            font-size: 10/16rem;
            height: 12/16rem;
            width: 12/16rem;
            margin: 5/16rem;
            text-align: center;
            vertical-align: middle;
            color: transparent;
            &:hover {
              color: #fff;
            }
          }
        }
      }
      .scroll {
        flex: 1;
        margin: 10/16rem 0;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .actions {
        flex: none;
        max-height: 192/16rem;
      }
    }

    .menu {
      opacity: 1;
      z-index: 1;
    }

    .option {
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;

      li {
        justify-content: space-between;
      }

      input, select {
        font-size: 12/16rem;
        width: 100/16rem;
        height: 26/16rem;
        padding: 2/16rem 4/16rem;
      }
    }

    &.open-option {
      .menu {
        opacity: 0;
        z-index: -1;
      }
      .option {
        opacity: 1;
        z-index: 1;
      }
    }

    .resizer {
      @width: 6;
      position: absolute;
      top: 0;
      right: 0;
      cursor: col-resize;
      height: 100%;
      width: @width/16rem;
      margin-left: -@width/2/16rem;
      margin-right: -@width/2/16rem;
      z-index: 1000;
    }


    // ::-webkit-scrollbar {
    //   width: 0;
    //   -webkit-appearance: none;
    // }
  }
</style>

<template>
  <aside class="sidebar" :class="{ 'open-option': openOption }" :style="{ width: open ? width + 'px': '0', transition: transition }">
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
          <li v-for="item in records" track-by="$index" :class="{ active: $root.current_stamp === item.stamp }" title="{{ item.path }}" v-link="{ name: 'demo', params: { item: item.stamp } }">
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
          <li @click="toggleOption()">Option</li>
          <li @click="$parent.window('toggle-about')">About</li>
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
          <li @click="toggleOption()">back</li>
        </ul>
      </div>
    </div>
    <i class="resizer" @mousedown="mousedown($event)"></i>
  </aside>
</template>

<script>
  import path from 'path'

  export default {
    props: {
      open: { twoWay: true }
    },

    data () {
      this.loadRecords()
      this.$storage.watchList(() => this.loadRecords())
      return { records: [], width: 250, openOption: false }
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
      },

      toggleOption () {
        this.openOption = !this.openOption
      },

      mousedown (e) {
        this.beginX = e.clientX
        this.beginWidth = this.width // parseInt(getComputedStyle(this.$el).width)
        // this.$el.style.transition = 'none'
        this.transition = 'none'
        this.$root.$el.addEventListener('mousemove', this.mousemove)
        this.$root.$el.addEventListener('mouseup', this.mouseup)
      },

      mousemove (e) {
        let width = this.beginWidth + e.clientX - this.beginX
        width = width < 120 ? 120 : width
        width = width > 600 ? 600 : width
        this.width = width
      },

      mouseup (e) {
        this.$root.$el.removeEventListener('mousemove', this.mousemove)
        this.$root.$el.removeEventListener('mouseup', this.mouseup)
        // this.$el.style.transition = ''
        this.transition = ''
      }
    }
  }
</script>
