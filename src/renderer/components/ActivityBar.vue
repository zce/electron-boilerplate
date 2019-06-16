<template>
  <div class="activitybar">
    <span>ActivityBar</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ActivityBar extends Vue {}
</script>

<style lang="scss">
.activitybar {
  width: 2.5rem;
  background: var(--activitybar-bg);
  color: var(--activitybar-color);
  font-size: 0.6rem;
  line-height: 2.5rem;
  text-align: center;
  writing-mode: vertical-rl;
}
</style>
