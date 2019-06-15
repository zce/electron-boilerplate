<template>
  <div class="home">
    <h1>{{ $t('hello') }}</h1>
    <p>
      <select v-model="$i18n.locale">
        <option v-for="(value, key) in locales" :value="key" :key="key">{{
          value
        }}</option>
      </select>
      <span>{{ $i18n.locale }}</span>
    </p>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const counter = namespace('counter')

@Component
export default class Home extends Vue {
  @counter.Getter count!: number
  @counter.Action increment!: () => void
  @counter.Action incrementAsync!: () => void
  @counter.Action decrement!: () => void
  @counter.Action decrementAsync!: () => void

  data () {
    const availables = this.$i18n.availableLocales
    const messages = this.$i18n.messages
    const locales = availables.reduce(
      (o, k) => ({ ...o, [k]: messages[k].name }),
      {}
    )
    return { locales }
  }

  @Watch('$i18n.locale')
  localeChange (value: string, prev: string) {
    this.$store.dispatch('updateSettings', { locale: value })
  }
}
</script>

<style lang="scss">
.home {
  flex-grow: 1;
  padding: 5rem;
  text-align: center;
  font-size: 2rem;
}
</style>
