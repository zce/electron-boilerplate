import Vue from 'vue'
import I18n from 'vue-i18n'

Vue.use(I18n)

// https://kazupon.github.io/vue-i18n/
// http://www.gnu.org/software/gettext/manual/gettext.html#Usual-Language-Codes
export default new I18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('./locales/en'),
    zh: require('./locales/zh'),
    ja: require('./locales/ja')
  }
})
