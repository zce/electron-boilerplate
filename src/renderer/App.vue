<template>
  <div class="workbench" :data-theme="settings.theme">
    <TitleBar title="Electron Boilerplate" />
    <div class="wrapper">
      <ActivityBar />
      <SideBar />
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <StatusBar />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import TitleBar from './components/TitleBar.vue'
import ActivityBar from './components/ActivityBar.vue'
import SideBar from './components/SideBar.vue'
import StatusBar from './components/StatusBar.vue'

@Component({ components: { TitleBar, ActivityBar, SideBar, StatusBar } })
export default class App extends Vue {
  @Getter settings!: { [key: string]: any }
}
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
  flex: 1 0%;
  flex-direction: column;
}
</style>
