<template>
  <aside class="activitybar">
    <ul class="list" role="toolbar" aria-label="Active View Switcher">
      <li class="item" v-for="(item, i) in actions" :key="i">
        <router-link :title="item.title" role="button" :aria-label="item.title" :to="{ name: item.name }" exact>
          <svg width="24" height="24" fill="currentColor" aria-hidden="true"><use :xlink:href="icons + '#' + item.icon"></use></svg>
        </router-link>
      </li>
    </ul>
    <ul class="list" role="toolbar" aria-label="Global Actions">
      <li class="item">
        <a role="button" aria-label="About" @click="handleAbout">
          <svg width="24" height="24" fill="currentColor" aria-hidden="true"><use :xlink:href="icons + '#info'"></use></svg>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ActivityBar extends Vue {
  icons = require('../assets/icons.svg')

  actions = [
    { title: 'WordPress', name: 'home', icon: 'wordpress' },
    { title: 'Dashboard', name: 'home', icon: 'dashboard' },
    { title: 'Vuex', name: 'vuex', icon: 'backup' },
    // { title: 'Posts', name: 'foobar', icon: 'admin-post' },
    // { title: 'Users', name: 'foobar', icon: 'admin-users' },
    // { title: 'Plugins', name: 'foobar', icon: 'admin-plugins' },
    { title: 'Settings', name: 'settings', icon: 'admin-settings' }
  ]

  handleAbout () {
    // this.$electron.remote.Menu
    this.$router.push({ name: 'about' })
  }
}
</script>

<style lang="scss">
.activitybar {
  display: flex;
  flex: 0 0 3.125rem;
  flex-direction: column;
  width: 3.125rem;
  background: var(--activitybar-bg);
  color: var(--activitybar-color);
  font-size: 0.75rem;

  .list {
    margin: 0;
    padding: 0;
    list-style: none;

    &:first-child {
      flex: 1 0%;
    }

    .item {
      padding: 0.3125rem 0;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.5rem;
      color: var(--activitybar-color);

      &:hover,
      &.active {
        color: var(--activitybar-active-color);
      }
    }
  }
}
</style>
