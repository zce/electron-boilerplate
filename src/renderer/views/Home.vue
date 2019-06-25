<template>
  <div class="home">
    <h1>{{ $t('hello') }}</h1>
    <p>
      <button @click="incrementAsync">++</button>
      <button @click="increment">+</button>
      <span>{{ count }}</span>
      <button @click="decrement">-</button>
      <button @click="decrementAsync">--</button>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const counter = namespace('counter')

@Component
export default class Home extends Vue {
  // vuex-class style
  @counter.Getter count!: number
  @counter.Action increment!: () => void
  @counter.Action incrementAsync!: () => void
  @counter.Action decrement!: () => void
  @counter.Action decrementAsync!: () => void
}
</script>

<style lang="scss">
.home {
  flex-grow: 1;
  padding: 5rem;
  text-align: center;
  font-size: 1rem;
}
</style>
