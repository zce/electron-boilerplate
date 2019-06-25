<template>
  <div class="home">
    <h1>{{ $t('hello') }}</h1>
    <img src="../../../build/icon.png">
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    width: 12rem;
  }
}
</style>
