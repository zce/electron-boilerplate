<template>
  <div class="sidebar"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SideBar extends Vue {
  // @ts-ignore
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 10rem;
  color: var(--sidebar-color);
  background: var(--sidebar-bg);
}
</style>
