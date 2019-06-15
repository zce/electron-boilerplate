<template>
  <div class="activitybar">
    <small>ActivityBar</small>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ActivityBar extends Vue {}
</script>

<style lang="scss">
.activitybar {
  width: 2.5rem;
  color: var(--activitybar-color);
  background: var(--activitybar-bg);

  small {
    writing-mode: vertical-rl;
  }
}
</style>
