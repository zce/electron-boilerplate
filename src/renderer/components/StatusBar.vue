<template>
  <div class="statusbar">
    <span>StatusBar</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {}
</script>

<style lang="scss">
.statusbar {
  height: 1.1rem;
  background: var(--statusbar-bg);
  color: var(--statusbar-color);
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.1rem;
}
</style>
