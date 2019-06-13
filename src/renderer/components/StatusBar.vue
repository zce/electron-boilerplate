<template>
  <div class="statusbar"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {}
</script>

<style scoped lang="scss">
.statusbar {
  height: 1.1rem;
  color: var(--statusbar-color);
  background: var(--statusbar-bg);
}
</style>
