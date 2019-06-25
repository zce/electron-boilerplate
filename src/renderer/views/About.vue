<template>
  <div class="about">
    <h1>{{ $t('about') }}</h1>
    <ul>
      <li>Source: <a href="https://github.com/zce/electron-boilerplate">https://github.com/zce/electron-boilerplate</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class About extends Vue {}
</script>

<style lang="scss">
.about {
  height: 200rem;
}
</style>
