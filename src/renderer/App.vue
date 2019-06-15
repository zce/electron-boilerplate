<template>
  <div class="workbench" data-theme="dark">
    <TitleBar title="Electron Boilerplate" />
    <div class="wrapper">
      <ActivityBar />
      <SideBar />
      <div class="container">
        <!-- <div class="tabs"></div>
        <div class="main"></div> -->
        <router-view></router-view>
      </div>
    </div>
    <StatusBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import TitleBar from './components/TitleBar.vue'
import ActivityBar from './components/ActivityBar.vue'
import SideBar from './components/SideBar.vue'
import StatusBar from './components/StatusBar.vue'

@Component({ components: { TitleBar, ActivityBar, SideBar, StatusBar } })
export default class App extends Vue {}
</script>

<style lang="scss">
.workbench {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: var(--global-color);
  background: var(--global-bg);
}

.wrapper {
  display: flex;
  flex-grow: 1;
}

.container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>
