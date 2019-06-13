<template>
  <div class="titlebar">{{ title }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TitleBar extends Vue {
  // @ts-ignore
  @Prop() private title!: string
}
</script>

<style scoped lang="scss">
.titlebar {
  height: 1.1rem;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.1rem;
  color: var(--titlebar-color);
  background: var(--titlebar-bg);
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
