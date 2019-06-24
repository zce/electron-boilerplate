// https://github.com/imcvampire/vue-axios/blob/master/index.d.ts
// https://www.mistergoodcat.com/post/vuejs-plugins-with-typescript
import electron from 'electron'

declare module 'vue/types/vue' {
  interface Vue {
    $electron: typeof electron
  }

  interface VueConstructor {
    electron: typeof electron
  }
}
