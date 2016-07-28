<style scoped>
  textarea {
    flex: 1;
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="inner">
    <h1 class="page-header drag">Start</h1>
    <textarea cols="80" rows="10" v-model="content"></textarea>
    <button class="btn btn-primary btn-lg btn-block" @click="save()">Create</button>
  </div>
</template>

<script>
  export default {
    name: 'start',

    data () {
      this.$root.title = '创建新的记录'
      return { content: '' }
    },

    methods: {
      save () {
        const stamp = this.$utils.getStamp()
        this.$storage.set(stamp, { content: this.content })
        this.$router.go({ name: 'watch', params: { item: stamp } })
      }
    }
  }
</script>
