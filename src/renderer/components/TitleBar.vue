<template>
  <!-- https://github.com/Menci/electron-titlebar -->
  <header class="titlebar" :class="{ inactive: !isActive }" @dblclick="handleToggle">{{ title }}</header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TitleBar extends Vue {
  window = this.$electron.remote.getCurrentWindow()

  title = this.$electron.remote.app.getName()
  isActive: boolean = true

  created () {
    this.window.on('blur', this.handleBlur)
    this.window.on('focus', this.handleFocus)
  }

  mounted () {
    document.title = this.title
  }

  destroyed () {
    this.window.removeListener('blur', this.handleBlur)
    this.window.removeListener('focus', this.handleFocus)
  }

  handleBlur () {
    this.isActive = false
  }

  handleFocus () {
    this.isActive = true
  }

  handleToggle () {
    if (this.window.isMaximized()) {
      this.window.unmaximize()
    } else {
      this.window.maximize()
    }
  }
}
</script>

<style lang="scss">
.titlebar {
  flex: 0 0 1.375rem;
  height: 1.375rem;
  color: var(--titlebar-color);
  background: var(--titlebar-bg);
  font-size: 0.75rem;
  line-height: 1.375rem;
  text-align: center;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  &.inactive {
    color: var(--titlebar-inactive-color);
    background: var(--titlebar-inactive-bg);
  }
}
</style>
