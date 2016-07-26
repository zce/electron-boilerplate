export default {
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get (key, def) {
    const value = window.localStorage.getItem(key)
    if (value === null) return def
    return JSON.parse(value)
  }
}
