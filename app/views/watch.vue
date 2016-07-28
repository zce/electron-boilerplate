<style scoped>
  textarea {
    flex: 1;
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="inner">
    <h1 class="page-header drag">Watch</h1>
    <textarea cols="80" rows="10" v-model="item.content"></textarea>
  </div>
</template>

<script>
  export default {
    data () {
      return { item: {} }
    },

    route: {
      data (transition) {
        const stamp = transition.to.params.item
        this.loadData(stamp)
        this.$storage.watch(stamp, () => this.loadData(stamp))
      }
    },

    methods: {
      loadData (stamp) {
        if (!stamp) return this.$router.go({ name: 'start' })
        const item = this.$storage.get(stamp)
        if (!item) return this.$router.go({ name: 'start' })
        this.item = item
        this.$root.title = stamp
        return this.item
      }
    }
  }
</script>
