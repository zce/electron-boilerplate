<template>
  <div class="activitybar"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ActivityBar extends Vue {
  // @ts-ignore
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
.activitybar {
  width: 2.5rem;
  color: var(--activitybar-color);
  background: var(--activitybar-bg);
}
</style>
