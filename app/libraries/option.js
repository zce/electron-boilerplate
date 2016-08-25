export function set (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function get (key, def) {
  const value = window.localStorage.getItem(key)
  if (value === null) return def
  return JSON.parse(value)
}
