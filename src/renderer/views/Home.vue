<template>
  <div class="home">
    <h1>{{ $t('hello') }}</h1>
    <p>
      <select v-model="$i18n.locale">
        <option v-for="(value, key) in locales" :value="key" :key="key">{{
          value
        }}</option>
      </select>
    </p>
    <p>{{ $i18n.locale }}</p>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  @Watch('$i18n.locale')
  localeChange (value: string, prev: string) {
    console.log(111)
    this.$store.dispatch('updateSettings', { locale: value })
  }

  data () {
    const locales = this.$i18n.availableLocales.reduce(
      (o, k) => ({ ...o, [k]: this.$i18n.messages[k].name }),
      {}
    )
    return { locales }
  }
}
</script>

<style lang="scss">
.home {
  flex-grow: 1;

  h1 {
    text-align: center;
  }
}
</style>
