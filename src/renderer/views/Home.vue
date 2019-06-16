<template>
  <div class="home">
    <h1>{{ $t('hello') }}</h1>
    <p>
      <select v-model="locale">
        <option v-for="(value, key) in locales" :value="key" :key="key">{{
          value
        }}</option>
      </select>
      <span>{{ $i18n.locale }}</span>
    </p>
    <p>
      <select v-model="theme">
        <option value="dark">暗色</option>
        <option value="light">亮色</option>
      </select>
    </p>
    <br />
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

  // @Watch('settings.locale')
  // localeChange (value: string, prev: string) {
  //   this.$store.dispatch('updateSettings', { locale: value })
  //   this.$i18n.locale = value
  // }

  // @Watch('settings.theme')
  // themeChange (value: string, prev: string) {
  //   this.$store.dispatch('updateSettings', { theme: value })
  // }

  // getter style
  get locale () {
    return this.$store.getters.settings.locale
  }
  set locale (value: string) {
    this.$i18n.locale = value
    this.$store.dispatch('updateSettings', { locale: value })
  }

  get theme () {
    return this.$store.getters.settings.theme
  }
  set theme (value: string) {
    this.$store.dispatch('updateSettings', { theme: value })
  }

  data () {
    const availables = this.$i18n.availableLocales
    const messages = this.$i18n.messages
    const locales = availables.reduce(
      (o, k) => ({ ...o, [k]: messages[k].name }),
      {}
    )
    return { locales }
  }
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
