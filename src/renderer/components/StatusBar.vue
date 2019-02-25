<template>
  <div class="statusbar"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StatusBar extends Vue {
  // @ts-ignore
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
.statusbar {
  height: 1.1rem;
  color: var(--statusbar-color);
  background: var(--statusbar-bg);
}
</style>
