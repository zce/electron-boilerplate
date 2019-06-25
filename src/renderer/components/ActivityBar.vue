<template>
  <aside class="activitybar">
    <ul class="list">
      <router-link tag="li" class="item" :to="{ name: 'home' }" exact>
        <a><svg width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="../assets/icons.svg#dashboard"></use></svg></a>
      </router-link>
      <router-link tag="li" class="item" :to="{ name: 'foo' }" exact>
        <a><svg width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="../assets/icons.svg#admin-post"></use></svg></a>
      </router-link>
      <router-link tag="li" class="item" :to="{ name: 'foo' }" exact>
        <a><svg width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="../assets/icons.svg#admin-users"></use></svg></a>
      </router-link>
      <router-link tag="li" class="item" :to="{ name: 'foo' }" exact>
        <a><svg width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="../assets/icons.svg#admin-plugins"></use></svg></a>
      </router-link>
      <router-link tag="li" class="item" :to="{ name: 'settings' }" exact>
        <a><svg width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="../assets/icons.svg#admin-settings"></use></svg></a>
      </router-link>
    </ul>
    <ul class="list">
      <router-link tag="li" class="item" :to="{ name: 'home' }" exact>
        <a><svg width="24" height="24" fill="currentColor" aria-hidden="true"><use xlink:href="../assets/icons.svg#admin-generic"></use></svg></a>
      </router-link>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ActivityBar extends Vue {}
</script>

<style lang="scss">
.activitybar {
  display: flex;
  flex-direction: column;
  width: 2.5rem;
  background: var(--activitybar-bg);
  color: var(--activitybar-color);
  font-size: 0.6rem;

  .list {
    margin: 0;
    padding: 0;
    list-style: none;

    &:first-child {
      flex: 1 0%;
    }

    .item {
      color: var(--activitybar-color);

      &:hover,
      &.active {
        color: var(--activitybar-hover-color);
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.5rem;
      color: inherit;
    }
  }
}
</style>
