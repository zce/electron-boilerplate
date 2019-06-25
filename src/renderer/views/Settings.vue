<template>
  <div class="settings">
    <h1>{{ $t('settings') }}</h1>
    <p>
      <label for="setting_locale">{{ $t('language') }}</label>
      <select id="setting_locale" v-model="locale">
        <option v-for="(value, key) in locales" :value="key" :key="key">{{ value }}</option>
      </select>
    </p>
    <p>
      <label for="setting_theme">{{ $t('theme') }}</label>
      <select id="setting_theme" v-model="theme">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </p>
    <p>
      <label for="setting_title_bar_style">{{ $t('titlebarstyle') }}</label>
      <select id="setting_title_bar_style" v-model="titleBarStyle">
        <option value="custom">Custom</option>
        <option value="native">Native</option>
      </select>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Settings extends Vue {
  // getter & setter style
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

  get titleBarStyle () {
    return this.$store.getters.settings.titleBarStyle
  }

  set titleBarStyle (value: string) {
    if (confirm('A restart is required for the change in titleBarStyle to take effect.')) {
      this.$store.dispatch('updateSettings', { titleBarStyle: value })
      this.$electron.remote.app
        .relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
      this.$electron.remote.app.exit()
    }
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
.settings {
  label {
    display: inline-block;
    width: 10rem;
    margin: 0 1rem 0 0;
    font-weight: normal;
    text-align: right;
  }

  select {
    width: 20rem;
  }
}
</style>
