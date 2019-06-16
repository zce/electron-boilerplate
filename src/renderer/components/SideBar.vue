<template>
  <div class="sidebar">
    <span>SideBar</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {}
</script>

<style lang="scss">
.sidebar {
  width: 10rem;
  background: var(--sidebar-bg);
  color: var(--sidebar-color);
  font-size: 0.6rem;
  line-height: 10rem;
  text-align: center;
  writing-mode: vertical-rl;
}
</style>
