<template>
  <div class="sidebar">
    <small>SideBar</small>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {}
</script>

<style scoped lang="scss">
.sidebar {
  width: 10rem;
  color: var(--sidebar-color);
  background: var(--sidebar-bg);
}
</style>
