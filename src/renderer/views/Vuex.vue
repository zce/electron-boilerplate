<template>
  <div class="vuex">
    <h1>Vuex</h1>
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
export default class Vuex extends Vue {
  // vuex-class style
  @counter.Getter count!: number
  @counter.Action increment!: () => void
  @counter.Action incrementAsync!: () => void
  @counter.Action decrement!: () => void
  @counter.Action decrementAsync!: () => void
}
</script>

<style lang="scss">
.vuex {
  flex-grow: 1;
  padding: 5rem;
  text-align: center;

  h1 {
    font-size: 5rem;
  }

  p {
    padding: 5rem 0;
    font-size: 3rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.3125rem;
    font-size: 3rem;
    line-height: 1;
    background-color: #fff;
    color: #444;
  }
}
</style>
