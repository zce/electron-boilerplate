<style lang="less">
  .sidebar {
    // display: flex;
    position: relative;
    transition: width 0.2s ease-in-out;
    // transition-delay: 0.2s;

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
        width: 55%;
        // max-width: 150/16rem;
        min-width: 100/16rem;
        height: 26/16rem;
        padding: 2/16rem 6/16rem;
        border: 1/16rem solid;
        border-radius: 4/16rem;
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
  <aside class="sidebar" :class="{'open-option': openOption}" :style="{width: open ? width + 'px': '0', transition: transition}">
    <section class="panel menu">
      <h1 class="logo drag">{{$config.app.name}}</h1>
      <hr>
      <h3>{{$t('sidebar.actions.title')}}</h3>
      <div class="scroll actions">
        <ul>
          <li v-link="{name: 'dashboard'}" :class="{active: $route.name === 'dashboard'}">{{$t('sidebar.actions.dashboard')}}</li>
          <li v-link="{name: 'start'}" :class="{active: $route.name === 'start'}">{{$t('sidebar.actions.start')}}</li>
          <li v-link="{name: 'update'}" :class="{active: $route.name === 'update'}">{{$t('sidebar.actions.update')}}</li>
          <li v-link="{name: 'vuex'}" :class="{active: $route.name === 'vuex'}">{{$t('sidebar.actions.vuex')}}</li>
        </ul>
      </div>
      <hr>
      <h3>{{$t('sidebar.records.title')}}</h3>
      <div class="scroll">
        <ul>
          <li title="{{item.path}}" v-for="item in records" track-by="$index" :class="{active: $route.name === 'watch' && $route.params.item === item.stamp}" v-link="{name: 'watch', params: {item: item.stamp}}">
            <span class="name">{{item.name}}</span>
            <i class="fa fa-external-link" title="{{$t('sidebar.records.revealinfinder', {name: item.name})}}" @click="reveal(item, $event)"></i>
            <i class="fa fa-times" title="{{$t('sidebar.records.movetotrash', {name: item.name})}}" @click="remove(item, $event)"></i>
          </li>
        </ul>
      </div>
      <hr>
      <h3>{{$t('sidebar.help.title')}}</h3>
      <div class="scroll actions">
        <ul>
          <li @click="toggleOption()">{{$t('sidebar.help.options')}}</li>
          <li @click="$parent.window('toggle-about')">{{$t('sidebar.help.about')}}</li>
        </ul>
      </div>
    </section>
    <section class="panel option">
      <h1>{{$t('sidebar.settings.title')}}</h1>
      <hr>
      <h3>{{$t('sidebar.options.title')}}</h3>
      <div class="scroll">
        <ul>
          <li>
            <label for="theme">{{$t('sidebar.options.theme.title')}}</label>
            <select id="theme" v-model="$root.window_theme">
              <option v-for="(key, value) in themes" value="{{key}}">{{$t('sidebar.options.theme.' + value)}}</option>
            </select>
          </li>
          <li>
            <label for="address">{{$t('sidebar.options.address')}}</label>
            <select id="address" v-model="$root.server_address">
              <option v-for="item in addresses" value="{{item}}">{{item}}</option>
            </select>
          </li>
          <li>
            <label for="port">{{$t('sidebar.options.port')}}</label>
            <input id="port" type="number" v-model="$root.server_port" debounce="500" number lazy>
          </li>
          <li>
            <label for="locales">{{$t('sidebar.options.locales')}}</label>
            <select id="locales" v-model="$root.lang">
              <option v-for="(key, value) in locales" value="{{key}}">{{value.name}}</option>
            </select>
          </li>
        </ul>
      </div>
      <hr>
      <h3>{{$t('sidebar.help.title')}}</h3>
      <div class="scroll actions">
        <ul>
          <li @click="toggleOption()">{{$t('sidebar.help.back')}}</li>
        </ul>
      </div>
    </section>
    <i class="resizer" @mousedown="mousedown($event)"></i>
  </aside>
</template>

<script>
  import path from 'path'
  import locales from '../assets/locales'

  export default {
    props: {
      open: { twoWay: true }
    },

    data () {
      this.loadRecords()
      this.$storage.watchList(() => this.loadRecords())

      return {
        locales: locales,
        // themes: { default: '默认', dark: '暗色', light: '亮色' },
        themes: { default: 'default', dark: 'dark', light: 'light' },
        addresses: this.$utils.getMachineAddresses(),
        records: [],
        width: 250,
        openOption: false
      }
    },

    methods: {
      loadRecords () {
        this.$storage.getList().then(files => {
          this.records = files.map(file => ({
            name: file,
            stamp: path.basename(file, this.$config.storage.ext),
            path: path.join(this.$config.storage.root, file)
          }))
        })
      },

      remove (item, e) {
        e.preventDefault()
        e.stopPropagation()
        if (!confirm(`确认删除『${item.stamp}${this.$config.storage.ext}』？`)) return false

        try {
          // 删除到回收站
          item.path && this.$electron.shell.moveItemToTrash(item.path)
        } catch (e) {
          // return $.logger.error(e)
        }
        // 当前打开的不是该文件
        if (this.$root.title !== item.stamp) return false
        // 跳转到第一个记录
        const find = this.records.some(r => {
          if (r.stamp !== item.stamp) {
            this.$router.go({ name: 'watcher', params: { item: r.stamp } })
            return true
          }
        })

        // 没有记录跳转到开始界面
        find || this.$router.go({ name: 'dashboard' })
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
        width = width < 200 ? 200 : width
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
