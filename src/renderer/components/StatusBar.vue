<template>
  <footer class="statusbar">
    <span>StatusBar</span>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {}
</script>

<style lang="scss">
.statusbar {
  flex: 0 0 1.375rem;
  height: 1.375rem;
  background: var(--statusbar-bg);
  color: var(--statusbar-color);
  font-size: 0.75rem;
  line-height: 1.375rem;
  text-align: center;

  span {
    opacity: 0.3;
  }
}
</style>
