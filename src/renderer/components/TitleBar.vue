<template>
  <div class="titlebar" :class="{ inactive: !isActive }">{{ title }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TitleBar extends Vue {
  @Prop() title!: string

  window = this.$electron.remote.getCurrentWindow()
  isActive: boolean = true

  created () {
    this.window.on('blur', this.onBlur)
    this.window.on('focus', this.onFocus)
  }

  destroyed () {
    this.window.removeListener('blur', this.onBlur)
    this.window.removeListener('focus', this.onFocus)
  }

  onBlur () {
    this.isActive = false
  }

  onFocus () {
    this.isActive = true
  }
}
</script>

<style lang="scss">
.titlebar {
  height: 1.1rem;
  color: var(--titlebar-color);
  background: var(--titlebar-bg);
  font-size: 0.6rem;
  line-height: 1.1rem;
  text-align: center;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  &.inactive {
    color: var(--titlebar-inactive-color);
    background: var(--titlebar-inactive-bg);
  }
}
</style>
