<style scoped>
  div.inner {
    align-items: center;
    justify-content: center;
  }
</style>

<template>
  <div>
    <h1 class="page-header select drag">VUEX</h1>
    <div class="inner">
      <h3>Count is {{ counterValue }}</h3>
      <img src="../assets/img/vuex.png" height="450" alt="VUEX">
      <button @click='increment'>Increment +1</button>
    </div>
  </div>
</template>

<script>
  import { incrementCounter } from '../libraries/vuex/actions'
  import { getCount } from '../libraries/vuex/getters'

  export default {
    vuex: {
      actions: {
        increment: incrementCounter
      },
      getters: {
        // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
        counterValue: getCount
      }
    }
  }
</script>
