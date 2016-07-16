<style scoped>
  a {
    color: rgb(50, 174, 110);
    text-decoration: none;

    &:hover { color: rgb(40, 56, 76); }
  }

  ul {
    list-style-type: none;
    margin-top: 10px;
  }

  li { display: inline-block; }
</style>

<template>
  <ul class="js-external-link">
    <li><a href="https://github.com/zce/electron-boilerplate">documentation</a> |</li>
    <li><a href="http://electron.atom.io/">electron</a> |</li>
    <li><a href="http://vuejs.org/">vue.js</a> |</li>
    <li><a v-link="{ name: 'demo' }">demo</a></li>
  </ul>
</template>
