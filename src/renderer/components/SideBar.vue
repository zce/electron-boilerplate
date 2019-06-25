<template>
  <aside class="sidebar">
    <span>SideBar</span>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {}
</script>

<style lang="scss">
.sidebar {
  flex: 0 0 12.5rem;
  width: 12.5rem;
  background: var(--sidebar-bg);
  color: var(--sidebar-color);
  font-size: 0.75rem;
  line-height: 12.5rem;
  text-align: center;
  writing-mode: vertical-rl;

  span {
    opacity: 0.3;
  }
}
</style>
